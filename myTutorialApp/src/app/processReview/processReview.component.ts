import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-processReview',
  templateUrl: './processReview.component.html',
  styleUrls: ['./processReview.component.css']
})
export class ProcessReviewComponent implements OnInit {
  // util
  keys = Object.keys;

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

  // dummy data
  dummyMachines: Array<string> = ["Machine1", "Machine2", "Machine3"];
  machine1Processes: Array<string> = ["PartLogistics", "Shipping"];
  machine1OrderNumbers: Array<string> = ["M1ON123", "M1ON456", "M1ON789"];
  machine2Processes: Array<string> = ["Pre-Processing", "Processing"];
  machine2OrderNumbers: Array<string> = ["M2ON123", "M2ON456", "M2ON789"];
  myDummyTable: Array<Object> = [
    {myDummyValue1: "1", myDummyValue2: "2", myDummyValue3: "3"},
    {myDummyValue1: "2", myDummyValue2: "3", myDummyValue3: "4"},
    {myDummyValue1: "3", myDummyValue2: "4", myDummyValue3: "5"},
  ]

  constructor() { }

  ngOnInit() {
    // assign the dummy machines to the machine dropdown!
  }

  getOrderNumber(selectedMachine: string) {
    // assign dummy order numbers to dropdown based on selectedMachine
  }

  getProcesses(selectedMachine: string, selectOrderNumber: string) {
    // assign dummy processes to dropdown based on selected machine and selected order number 
  }

  getProcessData(selectedProcess: string) {
    // just assign the dummy data to the table in any case
  }

}
