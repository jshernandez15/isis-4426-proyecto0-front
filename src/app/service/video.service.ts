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

  getVideos(id: number): Observable<any[]> {
    console.log(id);
    return this.http.get<any>(environment.api + '/competition/' + id + '/videos');
  }

  convertObjectToDto(data: VideoBd[]): Video[] {
    this.videos = [];
    data.forEach(element => {
      let video = Video.empty();
      video.id_video = element.id_video;
      video.description = element.description;
      video.email = element.email;
      video.idConcurso = element.idConcurso;
      video.lastName = element.last_name;
      video.name = element.name;
      video.path = element.path_real;
      video.pathConvertido = element.path_convertido;
      video.stateVideo = element.stateVideo;
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
