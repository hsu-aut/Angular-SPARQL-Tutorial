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
    // inject the service RdfDataService here
  ) { }

  ngOnInit() {
    // load the machine from the getMachines() service, assign data to machines
  }

  getOrderNumber(selectedMachine: string) {
    if (selectedMachine) {
      // load orders from the getOrders(selectedMachine) service, assign data to orderNumbers
    }
  }

  getProcesses(selectedMachine: string, selectOrderNumber: string) {
    if (selectedMachine && selectOrderNumber) {
      // load processes from the getProcesses(selectedMachine, selectOrderNumber) service, assign data to processes
    }
  }

  getProcessData(selectedProcess: string) {
    if (selectedProcess) {
      this._loaderShow = true;
      // load process data from the getProcessData(selectedProcess) service, assign data to the processDataTable
      // set this._loaderShow to false as soon as the data is available
      // set this.message to undefined in case that there is data
      // set a senseful this.message in case that there is no data
    }
  }
}
