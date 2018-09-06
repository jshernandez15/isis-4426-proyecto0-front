import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from "../../environments/environment";

const url = 'http://localhost:8000/upload';


@Injectable({
  providedIn: 'root'
})
export class FileUploadClientService {

  apiBaseURL = environment.api
  constructor(private http: HttpClient) { }

  fileUpload(fileItem: File, extraData?: object): any {
    let apiCreateEndpoint = this.apiBaseURL + "/upload";
    const formData: FormData = new FormData();

    formData.append('fileItem', fileItem, fileItem.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req)
  }

  optionalFileUpload(fileItem?: File, extraData?: object): any {
    let apiCreateEndpoint = `${this.apiBaseURL}/files/create/`
    const formData: FormData = new FormData(); //?
    let fileName;
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        if (key == 'fileName') {
          fileName = extraData[key]
        }
        formData.append(key, extraData[key])
      }
    }

    if (fileItem) {
      if (!fileName) {
        fileName = fileItem.name
      }
      formData.append('image', fileItem, fileName);
    }
    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req)
  }
  list(): Observable<any> {
    const listEndpoint = `${this.apiBaseURL}/files/`
    return this.http.get(listEndpoint)
  }
}
