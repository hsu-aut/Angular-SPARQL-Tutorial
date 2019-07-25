import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RdfDataService {

    host: string = 'http://localhost:7200';
    repository: string = 'Airbus_CTC_01';
    PREFIXES: Array<Prefix> = [

        { prefix: "VDI3682:", namespace: "http://www.hsu-ifa.de/ontologies/VDI3682#" },
        { prefix: "VDI2206:", namespace: "http://www.hsu-ifa.de/ontologies/VDI2206#" },
        { prefix: "DE6:", namespace: "http://www.hsu-ifa.de/ontologies/DINEN61360#" },
        { prefix: "ISA88:", namespace: "http://www.hsu-ifa.de/ontologies/ISA-TR88#" },
        { prefix: "wadl:", namespace: "http://www.hsu-ifa.de/ontologies/WADL#" },
        { prefix: "iso:", namespace: "http://www.hsu-ifa.de/ontologies/ISO22400-2#" },
        { prefix: "rdf:", namespace: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" },
        { prefix: "rdfs:", namespace: "http://www.w3.org/2000/01/rdf-schema#" },
        { prefix: "owl:", namespace: "http://www.w3.org/2002/07/owl#" },
        { prefix: "CTC:", namespace: "http://CTC_Knowledge_Base#" }
    ]

    constructor(
        private http: HttpClient
    ) { }

    // methods that fill in variables in a select query and return an observable of the db query
    getMachines() {
        var selectString = `
        PREFIX CTC: <http://CTC_Knowledge_Base#>
        PREFIX VDI3682: <http://www.hsu-ifa.de/ontologies/VDI3682#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT DISTINCT ?Machine WHERE { 
            ?MachineID VDI3682:TechnicalResourceIsAssignedToProcessOperator ?Process;
                    rdfs:label ?Machine.
            ?Process a VDI3682:Process.
        } `;
        return this.selectList(selectString, 0);
    }

    getOrders(machine: string) {
        var selectString = `
        PREFIX CTC: <http://CTC_Knowledge_Base#>
        PREFIX VDI3682: <http://www.hsu-ifa.de/ontologies/VDI3682#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT DISTINCT ?Order WHERE { 
            ?MachineID VDI3682:TechnicalResourceIsAssignedToProcessOperator ?Process;
                    rdfs:label "${machine}".
            ?Process a VDI3682:Process;
                     VDI3682:hasChild ?ChildProcess.
    		?ChildProcess VDI3682:isSubProcessOf ?Order.
        } `;
        return this.selectList(selectString, 0);
    }

    getProcesses(machine: string, orderNumber: string) {
        orderNumber = this.parseToIRI(orderNumber);
        var selectString = `
        PREFIX CTC: <http://CTC_Knowledge_Base#>
        PREFIX VDI3682: <http://www.hsu-ifa.de/ontologies/VDI3682#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT DISTINCT ?ChildProcess WHERE { 
            ?MachineID VDI3682:TechnicalResourceIsAssignedToProcessOperator ?Process;
                    rdfs:label "${machine}".
            ?Process a VDI3682:Process;
                     VDI3682:hasChild ?ChildProcess.
            ?ChildProcess VDI3682:isSubProcessOf ?Order.
    	FILTER(STRSTARTS(STR(?Order), "${orderNumber}"))
        }`;
        return this.selectList(selectString, 0);
    }

    getProcessData(process: string){
        process = this.parseToIRI(process);
        var selectString = `
        PREFIX CTC: <http://CTC_Knowledge_Base#>
        PREFIX VDI3682: <http://www.hsu-ifa.de/ontologies/VDI3682#>
        PREFIX DE6: <http://www.hsu-ifa.de/ontologies/DINEN61360#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX ctc: <http://CTC_Knowledge_Base#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        SELECT 
        ?Index ?NominalTemperatureHC1Value ?ActualTemperatureHC1Value ?TemperatureCheck
        ?NominalPressureValue ?ActualPressureValue ?PressureCheck

        WHERE { 

            <${process}> DE6:has_Data_Element ?DEI.
            ?DEI DE6:Instance_Description_has_Type ctc:HistoricalProcessData.
            
            ?DEI DE6:complex_Data_Type_has_Member ?NominalTemperatureHC1.
            ?DEI DE6:complex_Data_Type_has_Member ?ActualTemperatureHC1.
            ?DEI DE6:complex_Data_Type_has_Member ?NominalPressure.
            ?DEI DE6:complex_Data_Type_has_Member ?ActualPressure.

            ?NominalTemperatureHC1 DE6:Instance_Description_has_Type ctc:E_2-226_TD;
                DE6:Expression_Goal "Requirement";
                DE6:Array_Member_Position ?Index;
                DE6:Value ?NominalTemperatureHC1Value.
            ?ActualTemperatureHC1 DE6:Instance_Description_has_Type ctc:E_2-226_TD;
                DE6:Expression_Goal "Actual_Value";
                DE6:Array_Member_Position ?Index;
                DE6:Value ?ActualTemperatureHC1Value. 
        
            ?NominalPressure DE6:Instance_Description_has_Type ctc:E_2-229_TD;
                DE6:Expression_Goal "Requirement";
                DE6:Array_Member_Position ?Index;
                DE6:Value ?NominalPressureValue.
            ?ActualPressure DE6:Instance_Description_has_Type ctc:E_2-229_TD;
                DE6:Expression_Goal "Actual_Value";
                DE6:Array_Member_Position ?Index;
                DE6:Value ?ActualPressureValue.    
                FILTER (?ActualPressureValue != '0' || ?NominalTemperatureHC1Value != '0')
                } ORDER BY ( xsd:long ( ( STR ( ?Index ) ) ))`;
        return this.selectTable(selectString);
    }

    // utility functions
    private selectTable(Query) {
        var url = this.host + '/repositories/' + this.repository;
        var newTable: Array<Object>;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/sparql-query'
            })
        };

        var tableObservable = new Observable((observer) => {
            this.http.post(url, Query, httpOptions).subscribe((data: any) => {

                this.parseToPrefix(data);
                newTable = this.buildTable(data)
                observer.next(newTable)
                observer.complete()
            })
        })

        return tableObservable;
    }
    private selectList(Query, varPosition) {
        var url = this.host + '/repositories/' + this.repository;
        var currentList: Array<String>;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/sparql-query'
            })
        };

        var listObservable = new Observable((observer) => {
            this.http.post(url, Query, httpOptions).subscribe((data: any) => {
                this.parseToPrefix(data);
                currentList = this.buildList(data, varPosition)
                observer.next(currentList)
                observer.complete()

            })
        })
        return listObservable;
    }

    private buildTable(SPARQLReturn: any) {
        var heads = SPARQLReturn.head.vars
        var data = SPARQLReturn.results.bindings
        var table: Array<Object> = []

        // build empty table
        for (let row = 0; row < data.length; row++) {
            let rows = {}
            for (let head = 0; head < heads.length; head++) {
                let colname = heads[head]
                let cellEntry = ""
                rows[colname] = cellEntry
            } table.push(rows)
        }
        // fill table with data
        for (const rowNumber in data) {
            for (const colName in data[rowNumber]) {
                table[rowNumber][colName] = data[rowNumber][colName].value
            }
        }
        return table
    }

    private buildList(SPARQLReturn, index) {
        var head = SPARQLReturn.head.vars[index];
        var data = SPARQLReturn.results.bindings
        var list: Array<string> = [];

        for (const i in data) {
            list[i] = data[i][head].value
        }
        return list;

    }

    private parseToPrefix(SPARQLReturn: any) {
        var PREFIXES = this.PREFIXES;
        var returnObject = SPARQLReturn;
        // loop iterates over all results
        for (const key in returnObject.results.bindings) {
            if (returnObject.results.bindings.hasOwnProperty(key)) {
                const element = returnObject.results.bindings[key];
                // console.log(element)
                // loop iterates over all values of a result
                for (const key2 in element) {
                    if (element.hasOwnProperty(key2)) {
                        const elementValue = element[key2];
                        // console.log(elementValue)
                        // for each value it is checked whether there is a prefix to be used or not
                        for (let ii = 0; ii < PREFIXES.length; ii++) {
                            // help variable to use string function
                            var str = elementValue.value
                            // if a binding is using a namespace known to the app, then it is replaced by the known prefix
                            if (str.search(PREFIXES[ii].namespace) != -1) {
                                elementValue.value = str.replace(PREFIXES[ii].namespace, PREFIXES[ii].prefix)
                                // console.log(elementValue.value);
                            }
                        }
                    }
                }
            }
        }
        return returnObject;
    }
    private parseToIRI(IndividualWithPrefix: string): string {
        var PREFIXES = this.PREFIXES;
        var prefixedName: string = IndividualWithPrefix;
        var name: string;
        var IRI: string;
        var parsed: boolean;

        if (prefixedName.search("#") != -1) { return IndividualWithPrefix }
        for (let i = 0; i < PREFIXES.length; i++) {

            if (prefixedName.search(PREFIXES[i].prefix) != -1) {

                name = prefixedName.replace(PREFIXES[i].prefix, "");
                IRI = PREFIXES[i].namespace + name;
                parsed = true;
                break;
            }
        }
        if (parsed) {
            return IRI;
        } else return IndividualWithPrefix

    }

}

class Prefix {
    prefix: string;
    namespace: string;
}