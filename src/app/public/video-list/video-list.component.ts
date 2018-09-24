import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { constants } from '../../const/constants';
import { Competition } from "../../model/competition.model";
import { Video } from "../../model/video.model";
import { CompetitionService } from "../../service/competition.service";
import { VideoService } from "../../service/video.service";

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

  displayedColumns: string[] = ['id_video', 'name', 'description', 'pathConvertido'];

  dataSource;

  constructor(
    private router: ActivatedRoute,
    private videoService: VideoService,
    private route: Router,
    private competitionService: CompetitionService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;


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
      this.dataSource = new MatTableDataSource<Video>(this.videos);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onNew(): void {
    this.showForm = true;
  }

  updateValue(videos: Video[]) {
    this.loadList();
  }

}
