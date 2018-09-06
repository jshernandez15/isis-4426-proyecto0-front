import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { FileUploadClientService } from '../upload/upload.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit, OnDestroy {

  statusCreateForm: FormGroup;
  fileDescription: FormControl;
  statusFormGroup: FormControl;
  fileToUpload: File = null;
  uploadProgress: number = 0;
  uploadComplete: boolean = false;
  uploadingProgressing: boolean = false;
  fileUploadSub: any;
  serverResponse: any;
  allowedFormats = ['mp4', 'avi', 'flv'];

  @ViewChild('myInput')
  myFileInput: any;


  constructor(
    private fileUploadService: FileUploadClientService
  ) { }

  ngOnInit() {
    /* initilize the form and/or extra form fields
        Do not initialize the file field
    */

    this.statusFormGroup = new FormControl();

    this.fileDescription = new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(280)
    ])
    this.statusCreateForm = new FormGroup({
      'description': this.fileDescription,
    })
  }

  ngOnDestroy() {
    if (this.fileUploadSub) {
      this.fileUploadSub.unsubscribe()
    }
  }

  handleProgress(event) {

    if (event.type === HttpEventType.DownloadProgress) {
      this.uploadingProgressing = true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploadingProgressing = true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }

    if (event.type === HttpEventType.Response) {
      swal("Exito", "Video subido", "success");
      this.uploadComplete = true
      this.serverResponse = event.body
    }
  }
  handleSubmit(event: any, statusNgForm: NgForm, statusFormGroup: FormControl) {
    event.preventDefault()
    if (statusNgForm.submitted) {

      let submittedData = statusFormGroup.value

      this.fileUploadSub = this.fileUploadService.fileUpload(
        this.fileToUpload,
        submittedData).subscribe(
          event => this.handleProgress(event),
          error => {
            console.log("Server error")
          });

      statusNgForm.resetForm({})
    }
  }


  handleFileInput(files: FileList) {
    let allowedFormat = false;
    let fileItem = files.item(0);
    let format = fileItem.name.split(".")[1].toLocaleLowerCase();
    console.log("file input has changed. The file is", fileItem)
    this.fileToUpload = fileItem;

    if (this.allowedFormats.filter(data => { return format === data }).length > 0) {
      document.getElementById("buttonSubmit").click();
    } else {
      swal("Lo sentimos!", "Formato de video invalido", "error");
      return;
    }
  }

  resetFileInput() {
    console.log(this.myFileInput.nativeElement.files);
    this.myFileInput.nativeElement.value = "";
    console.log(this.myFileInput.nativeElement.files);
  }
}