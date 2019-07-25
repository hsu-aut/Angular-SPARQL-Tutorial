import { Component, OnInit } from '@angular/core';
import { RdfDataService } from '../services/rdf-data.service'


@Component({
  selector: 'app-processReview',
  templateUrl: './processReview.component.html',
  styleUrls: ['./processReview.component.css']
})
export class ProcessReviewComponent implements OnInit {
  // util
  keys = Object.keys;
  _loaderShow: boolean = false;

  // legend data
  valueOK: number = 1;
  valueWarning: number = 5;

  // dropdown selection
  selectedMachine: string;
  selectedProcess: string;
  selectOrderNumber: string;

  // dropdown data
  machines: Array<string>;
  processes: Array<string>;
  orderNumbers: Array<string>;

  // process data table
  processDataTable: Array<Object> = [];
  message: string;

  constructor(
    private dataService: RdfDataService
  ) { }

  ngOnInit() {
    this.dataService.getMachines().subscribe((data: any) => {
      this.machines = data;
    });
  }

  getOrderNumber(selectedMachine: string) {
    if (selectedMachine) {
      this.dataService.getOrders(selectedMachine).subscribe((data: any) => {
        this.orderNumbers = data;
      });
    }
  }

  getProcesses(selectedMachine: string, selectOrderNumber: string) {
    if (selectedMachine && selectOrderNumber) {
      this.dataService.getProcesses(selectedMachine, selectOrderNumber).subscribe((data: any) => {
        this.processes = data;
      });
    }
  }

  getProcessData(selectedProcess: string) {
    if (selectedProcess) {
      this._loaderShow = true;
      this.dataService.getProcessData(selectedProcess).subscribe((data: any) => {
        this._loaderShow = false;
        if (data.length != 0) {
          this.processDataTable = data;
          // this.processDataTable = this.checkData(this.processDataTable);
          console.log(this.processDataTable)
          this.message = undefined;
        } else {
          this.message = "There is no process data available.";
        }
      });
    }
  }

  checkData(table) {
    for (let row = 0; row < table.length; row++) {
      let nominalTemp = table[row].NominalTemperatureHC1Value;
      let actualTemp = table[row].ActualTemperatureHC1Value;
      let nominalPressure = table[row].NominalPressureValue;
      let actualPressure = table[row].ActualPressureValue;

      if (nominalTemp == 0 || actualTemp == 0) {
        table[row].TemperatureCheck = '-';
      } else if (Math.abs(1 - (nominalTemp / actualTemp)) * 100 <= this.valueOK) {
        table[row].TemperatureCheck = 'ok';
      } else if (Math.abs(1 - (nominalTemp / actualTemp)) * 100 <= this.valueWarning) {
        table[row].TemperatureCheck = 'warning';
      } else {
        table[row].TemperatureCheck = 'alert';
      }
      if (nominalPressure == 0 || actualPressure == 0) {
        table[row].PressureCheck = '-';
      } else if (Math.abs(1 - (nominalPressure / actualPressure)) * 100 <= this.valueOK) {
        table[row].PressureCheck = 'ok';
      } else if (Math.abs(1 - (nominalPressure / actualPressure)) * 100 <= this.valueWarning) {
        table[row].PressureCheck = 'warning';
      } else {
        table[row].PressureCheck = 'alert';
      }
    }
    return table;
  }
}
