import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert'

import { Event } from '../model/event.model'
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  events: Event[] = [];
  
  eventModel: Event;
  
  showNew: Boolean = false;
  
  submitType: string = 'Guardar';
  
  selectedRow: number;
  
  categories: string[] = ['Conferencia', 'Seminario', 'Congreso', 'Curso'];

  modalities: string[] = ['Presencial', 'Virtual'];
  
  constructor(private eventService: EventService) {
  }
  
  ngOnInit() {
    this.eventService.getEvents();
    this.loadList();
  }

  private loadList(): void {
      this.eventService.getEvents()
          .subscribe(events => this.events = events);
  }
  
  onNew() {
    this.eventModel = Event.empty();
    this.submitType = 'Save';
    this.showNew = true;
  }
  
  onSave() {
    /*
    if (this.submitType === 'Save') {
      this.events.push(this.eventModel);
    } else {
      this.events[this.selectedRow].firstName = this.eventModel.firstName;
      this.events[this.selectedRow].lastName = this.eventModel.lastName;
      this.events[this.selectedRow].dob = this.eventModel.dob;
      this.events[this.selectedRow].email = this.eventModel.email;
      this.events[this.selectedRow].password = this.eventModel.password;
      this.events[this.selectedRow].country = this.eventModel.country;
    }
    this.showNew = false;*/
  }
  
  onEdit(index: number) {
    /*
    this.selectedRow = index;
    this.eventModel = new Event();
    this.eventModel = Object.assign({}, this.events[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
    */
  }
  
  onDelete(index: number) {
    this.eventService.deleteEvent(index).subscribe(
      response => swal("Listo!", "El registro ha sido eliminado!", "success").then((value) => {
        this.events = this.events.filter(event => event.id != index);
      }),
      err => swal("Lo sentimos!", "El objeto ya ha sido borrado!", "error")
    );
  }
  
  onCancel() {
    this.showNew = false;
  }
  
  onChangeCategories(category: string) {
    this.eventModel.category = category;
  }

  onChangeModality(stage: string) {
    this.eventModel.stage = stage;
  }
}
