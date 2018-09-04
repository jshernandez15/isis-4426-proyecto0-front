import { Component, OnInit, ViewChild } from '@angular/core';
import { Video } from '../model/video.model';
import { FormGroup } from '@angular/forms';
import { StatusCreateComponent } from '../status-create/status-create.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  //styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  videoModel: Video;
  statusFormGroup: FormGroup;
  @ViewChild(StatusCreateComponent) statusCreateComponent: StatusCreateComponent;

  constructor() { }

  ngOnInit() {
    this.videoModel = Video.empty();
  }

  onSave() {

    if (this.statusCreateComponent && this.statusCreateComponent.serverResponse) {
      this.videoModel.path = this.statusCreateComponent.serverResponse.path;
    }

    if (this.videoModel.name == "") {
      swal("Lo sentimos!", "Debes indicar un nombre", "error");
      return;
    }
    if (this.videoModel.lastName == "") {
      swal("Lo sentimos!", "Debes indicar apellidos", "error");
      return;
    }
    if (this.videoModel.email == "") {
      swal("Lo sentimos!", "Debes indicar un email", "error");
      return;
    }
    if (this.videoModel.description == "") {
      swal("Lo sentimos!", "Debes indicar una descripcion", "error");
      return;
    }
    if (this.videoModel.path == "") {
      swal("Lo sentimos!", "Debes subir un video", "error");
      return;
    }
    console.log(this.videoModel);
  }

}
