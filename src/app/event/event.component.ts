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
    this.submitType = 'Guardar';
    this.showNew = true;
  }
  
  onSave() {
    if(this.eventModel.category == "Selecciona una opción") {
      swal("Lo sentimos!", "Debes indicar una categoria.", "error");
      return;
    }
    if(this.eventModel.end == null || this.eventModel.init == null) {
      swal("Lo sentimos!", "Debes indicar un rango de fechas.", "error");
      return;
    }
    if(this.eventModel.stage == "Selecciona una opción") {
      swal("Lo sentimos!", "Debes indicar una modalidad.", "error");
      return;
    }
      
    if (this.submitType === 'Guardar') {
      this.eventService.createEvent(this.eventModel).subscribe(
        response => this.events.push(response),
        err => swal("Lo sentimos!", "El objeto no ha podido ser añadido.", "error")
      );
    } else {
      this.eventService.editEvent(this.eventModel).subscribe(
        response => this.events[this.selectedRow] = response,
        err => swal("Lo sentimos!", "El objeto no ha podido ser editado.", "error")
      );
    }
    this.showNew = false;
  }
  
  onEdit(index: number) {
    this.selectedRow = index;
    this.eventModel = Event.empty();
    this.eventModel = Object.assign({}, this.events[this.selectedRow]);
    this.submitType = 'Actualizar';
    this.showNew = true;
  }

  onView(index: number) {
    swal(
      "Nombre: " + this.events[index].name + "\n" +
      "Categoria: " + this.events[index].category + "\n" +
      "Lugar: " + this.events[index].place + "\n" +
      "Dirección: " + this.events[index].address + "\n" +
      "Inicio: " + this.events[index].init + "\n" +
      "Fin: " + this.events[index].end + "\n" +
      "Modalidad: " + this.events[index].stage
    );
  }
  
  onDelete(index: number) {
    this.eventService.deleteEvent(index).subscribe(
      response => swal("Listo!", "El registro ha sido eliminado!", "success").then((value) => {
        this.events = this.events.filter(event => event.id != index);
      }),
      err => swal("Lo sentimos!", "El objeto ya ha sido borrado.", "error")
    );
  }
  
  onCancel() {
    this.showNew = false;
  }
  
  onChangeCategory(category: string) {
    this.eventModel.category = category;
  }

  onChangeModality(stage: string) {
    this.eventModel.stage = stage;
  }
}
