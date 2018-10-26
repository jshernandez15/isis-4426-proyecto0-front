import { Injectable } from "@angular/core";
import { Video } from "../model/video.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { VideoBd } from "../model/video.bd.model";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  constructor(private http: HttpClient) { }
  videos: Video[] = [];

  createVideo(video: Video): Observable<any> {
    return this.http.post<any>(
      environment.api + "/video/",
      this.requestFromCompetition(video)
    );
  }

  getVideos(id: string, state: string = "En proceso"): Observable<any[]> {
    return this.http.get<any>(
      environment.api + "/competition/" + id + "/videos/" + state
    );
  }

  getVideosById(id: number): Observable<any[]> {
    return this.http.get<any>(
      environment.api + "/competition/" + id + "/videos"
    );
  }

  convertObjectToDto(data: VideoBd[]): Video[] {
    this.videos = [];
    data.forEach(element => {
      var created = new Date(element.dateCreated);
      let video = Video.empty();
      video.id_video = element.id;
      video.description = element.description;
      video.email = element.email;
      video.idConcurso = element.idConcurso;
      video.lastName = element.last_name;
      video.name = element.name;
      video.path = element.path;
      video.pathConvertido = element.pathConvertido;
      video.stateVideo = element.state_video;
      video.created = created;
      this.videos.push(video);
    });
    return this.videos;
  }

  requestFromCompetition(video: Video) {
    return {
      ...video,
      fk_id_competition: video.idConcurso
    };
  }
}
