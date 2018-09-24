import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { Competition } from '../model/competition.model';
import { CompetitionService } from '../service/competition.service';
import { StatusCreateComponent } from '../status-create/status-create.component';





export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competitions: Competition[] = [];

  displayedColumns: string[] = ['name', 'index', 'address', 'prize'];

  dataSource;

  competitionModel: Competition;

  showNew: Boolean = false;

  submitType: string = 'Guardar';

  selectedRow: number;

  modalities: string[] = ['Presencial', 'Virtual'];


  @ViewChild(StatusCreateComponent)
  statusCreateComponent: StatusCreateComponent;

  constructor(private competitionService: CompetitionService, private router: Router) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.competitionService.getCompetitions();
    this.loadList();
  }

  private loadList(): void {
    this.competitionService.getCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions;
        this.dataSource = new MatTableDataSource<Competition>(this.competitions);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      });
  }

  onNew() {
    this.competitionModel = Competition.empty();
    this.submitType = 'Guardar';
    this.showNew = true;
  }

  onSave() {
    if (
      this.statusCreateComponent &&
      this.statusCreateComponent.serverResponse
    ) {
      this.competitionModel.banner = this.statusCreateComponent.serverResponse.path;
    }

    if (this.competitionModel.end == null || this.competitionModel.init == null) {
      swal("Lo sentimos!", "Debes indicar un rango de fechas.", "error");
      return;
    }

    if (this.competitionModel.banner == "") {
      swal("Lo sentimos!", "Debes subir una imagen", "error");
      return;
    }

    if (this.submitType === 'Guardar') {
      this.competitionService.createCompetition(this.competitionModel).subscribe(
        response => this.loadList(),
        err => {
          console.log(err.error.message === 'Error existing address');
          if (err) {
            swal("Lo sentimos!", "La URL ya existe", "error")
          } else {
            swal("Lo sentimos!", "El objeto no ha podido ser añadido.", "error")
          }
        }
      );
    } else {
      this.competitionService.editCompetition(this.competitionModel).subscribe(
        response => this.loadList(),
        err => swal("Lo sentimos!", "El objeto no ha podido ser editado.", "error")
      );
    }
    this.showNew = false;
  }

  onEdit(index: number) {
    this.selectedRow = index;
    this.competitionModel = Competition.empty();
    this.competitionModel = Object.assign({}, this.competitions[this.selectedRow]);
    const initDate = new Date(String(this.competitionModel.init));
    const endDate = new Date(String(this.competitionModel.end));
    this.competitionModel.init = { day: initDate.getDate(), month: initDate.getMonth(), year: initDate.getFullYear() }
    this.competitionModel.end = { day: endDate.getDate(), month: endDate.getMonth(), year: endDate.getFullYear() }
    this.submitType = 'Actualizar';
    this.showNew = true;
  }

  onView(index: number) {
    this.router.navigate(['competitions', this.competitions[index].id]);
  }

  onDelete(index: number) {
    this.competitionService.deleteCompetition(index).subscribe(
      response => swal("Listo!", "El registro ha sido eliminado!", "success").then((value) => {
        this.loadList();
      }),
      err => swal("Lo sentimos!", "El objeto ya ha sido borrado.", "error")
    );
  }

  onCancel() {
    this.showNew = false;
  }

}
