import { Injectable } from "@angular/core";
import { Video } from "../model/video.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  constructor(private http: HttpClient) {}

  createVideo(video: Video): Observable<any> {
    return this.http.post<any>(
      environment.api + "/video/",
      this.requestFromCompetition(video),
      this.getOptions()
    );
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        "x-access-token": localStorage.getItem("token"),
        Accept: "application/json"
      })
    };
  }

  requestFromCompetition(video: Video) {
    return {
      ...video,
       fk_id_competition: video.idConcurso
    };
  }
}
