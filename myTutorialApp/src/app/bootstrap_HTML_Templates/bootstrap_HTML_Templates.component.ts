import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootstrap_HTML_Templates',
  templateUrl: './bootstrap_HTML_Templates.component.html',
  styleUrls: ['./bootstrap_HTML_Templates.component.css']
})
export class Bootstrap_HTML_TemplatesComponent implements OnInit {

  keys = Object.keys;

  myDummyTable: Array<Object> = [
    {myDummyValue1: "1", myDummyValue2: "2", myDummyValue3: "3"},
    {myDummyValue1: "2", myDummyValue2: "3", myDummyValue3: "4"},
    {myDummyValue1: "3", myDummyValue2: "4", myDummyValue3: "5"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
