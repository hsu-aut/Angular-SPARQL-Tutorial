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
    // for each row of the table, check the conditions of nominal and actual value
    // if certain condition is met, set the row "TemperatureCheck" or "PressureCheck" to 'ok', 'warning' or 'danger'

    return table;
  }
}
