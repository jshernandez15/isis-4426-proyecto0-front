import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Event } from '../model/event.model'

@Component({
  selector: 'app-registration',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  events: Event[] = [];
  
  regModel: Event;
  
  showNew: Boolean = false;
  
  submitType: string = 'Save';
  
  selectedRow: number;
  
  countries: string[] = ['US', 'UK', 'India', 'UAE'];
  
  constructor() {
    this.events.push(new Event('Johan', 'Peter', {year: 1980, month: 5, day: 12}, 'johan@gmail.com', 'johan123', 'UK'));
    this.events.push(new Event('Mohamed', 'Tariq', {year: 1975, month: 12, day: 3}, 'tariq@gmail.com', 'tariq123', 'UAE'));
    this.events.push(new Event('Nirmal', 'Kumar', {year: 1970, month: 7, day: 25}, 'nirmal@gmail.com', 'nirmal123', 'India'));
  }
  
  ngOnInit() {
  }
  
  onNew() {
    this.regModel = new Event();
    this.submitType = 'Save';
    this.showNew = true;
  }
  
  onSave() {
    if (this.submitType === 'Save') {
      this.events.push(this.regModel);
    } else {
      this.events[this.selectedRow].firstName = this.regModel.firstName;
      this.events[this.selectedRow].lastName = this.regModel.lastName;
      this.events[this.selectedRow].dob = this.regModel.dob;
      this.events[this.selectedRow].email = this.regModel.email;
      this.events[this.selectedRow].password = this.regModel.password;
      this.events[this.selectedRow].country = this.regModel.country;
    }
    this.showNew = false;
  }
  
  onEdit(index: number) {
    this.selectedRow = index;
    this.regModel = new Event();
    this.regModel = Object.assign({}, this.events[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
  }
  
  onDelete(index: number) {
    this.events.splice(index, 1);
  }
  
  onCancel() {
    this.showNew = false;
  }
  
  onChangeCountry(country: string) {
    this.regModel.country = country;
  }
}
