import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert'

import { Competition } from '../model/competition.model'
import { CompetitionService } from '../service/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  
  competitions: Competition[] = [];
  
  competitionModel: Competition;
  
  showNew: Boolean = false;
  
  submitType: string = 'Guardar';
  
  selectedRow: number;
  
  categories: string[] = ['Conferencia', 'Seminario', 'Congreso', 'Curso'];

  modalities: string[] = ['Presencial', 'Virtual'];
  
  constructor(private competitionService: CompetitionService) {
  }
  
  ngOnInit() {
    this.competitionService.getCompetitions();
    this.loadList();
  }

  private loadList(): void {
      this.competitionService.getCompetitions()
          .subscribe(competitions => this.competitions = competitions);
  }
  
  onNew() {
    this.competitionModel = Competition.empty();
    this.submitType = 'Guardar';
    this.showNew = true;
  }
  
  onSave() {
    if(this.competitionModel.category == "Selecciona una opción") {
      swal("Lo sentimos!", "Debes indicar una categoria.", "error");
      return;
    }
    if(this.competitionModel.end == null || this.competitionModel.init == null) {
      swal("Lo sentimos!", "Debes indicar un rango de fechas.", "error");
      return;
    }
    if(this.competitionModel.stage == "Selecciona una opción") {
      swal("Lo sentimos!", "Debes indicar una modalidad.", "error");
      return;
    }
      
    if (this.submitType === 'Guardar') {
      this.competitionService.createCompetition(this.competitionModel).subscribe(
        response => this.competitions.push(response),
        err => swal("Lo sentimos!", "El objeto no ha podido ser añadido.", "error")
      );
    } else {
      this.competitionService.editCompetition(this.competitionModel).subscribe(
        response => this.competitions[this.selectedRow] = response,
        err => swal("Lo sentimos!", "El objeto no ha podido ser editado.", "error")
      );
    }
    this.showNew = false;
  }
  
  onEdit(index: number) {
    this.selectedRow = index;
    this.competitionModel = Competition.empty();
    this.competitionModel = Object.assign({}, this.competitions[this.selectedRow]);
    this.submitType = 'Actualizar';
    this.showNew = true;
  }

  onView(index: number) {
    swal(
      "Nombre: " + this.competitions[index].name + "\n" +
      "Categoria: " + this.competitions[index].category + "\n" +
      "Lugar: " + this.competitions[index].place + "\n" +
      "Dirección: " + this.competitions[index].address + "\n" +
      "Inicio: " + this.competitions[index].init + "\n" +
      "Fin: " + this.competitions[index].end + "\n" +
      "Modalidad: " + this.competitions[index].stage
    );
  }
  
  onDelete(index: number) {
    this.competitionService.deleteCompetition(index).subscribe(
      response => swal("Listo!", "El registro ha sido eliminado!", "success").then((value) => {
        this.competitions = this.competitions.filter(competition => competition.id != index);
      }),
      err => swal("Lo sentimos!", "El objeto ya ha sido borrado.", "error")
    );
  }
  
  onCancel() {
    this.showNew = false;
  }
  
  onChangeCategory(category: string) {
    this.competitionModel.category = category;
  }

  onChangeModality(stage: string) {
    this.competitionModel.stage = stage;
  }
}
