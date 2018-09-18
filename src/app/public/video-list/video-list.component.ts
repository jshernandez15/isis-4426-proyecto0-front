import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VideoService } from "../../service/video.service";
import { Video } from "../../model/video.model";
import { constants } from '../../const/constants';
import { CompetitionService } from "../../service/competition.service";
import { Competition } from "../../model/competition.model";

@Component({
  selector: "app-video-list",
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.css"]
})
export class VideoListComponent implements OnInit {
  url: string;
  idCompetition: number;
  videos: any[] = [];
  showForm: boolean;

  urlFotos;
  urlVideos = constants.PATH_VIDEOS;
  competition: Competition

  private sub: any;

  constructor(
    private router: ActivatedRoute,
    private videoService: VideoService,
    private route: Router,
    private competitionService: CompetitionService
  ) { }

  ngOnInit() {
    this.showForm = false;
    this.sub = this.router.params.subscribe(params => {
      this.url = decodeURI(params["url"].replace(/-/g, " "));
      this.idCompetition = Number(decodeURI(params["id"]));
      //dispatch action to load the details here.
      this.loadList();
    });
  }

  private loadList(): void {

    this.competitionService.getCompetitions()
      .subscribe(competitions => {
        this.urlFotos = constants.PATH_FOTOS;
        this.competition = competitions.filter(competition => competition.id == this.idCompetition)[0];
      }
      );
    this.videoService.getVideos(this.idCompetition, 'Generado').subscribe(data => {
      this.videos = this.videoService.convertObjectToDto(data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onNew(): void {
    this.showForm = true;
  }

  updateValue(videos: Video[]) {
    this.videos = videos;
  }

}
