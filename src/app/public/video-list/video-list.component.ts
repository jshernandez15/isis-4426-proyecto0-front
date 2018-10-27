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
  idCompetition: string;
  videos: any[] = [];
  showForm: boolean;

  urlFotos;
  urlVideos = constants.PATH_VIDEOS;
  competition: Competition

  private sub: any;

  displayedColumns: string[] = ['name', 'description', 'pathConvertido'];

  dataSource: MatTableDataSource<Video>;

  constructor(
    private router: ActivatedRoute,
    private videoService: VideoService,
    private route: Router,
    private competitionService: CompetitionService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.showForm = false;
    this.sub = this.router.params.subscribe(params => {
      this.url = decodeURI(params["url"].replace(/-/g, " "));
      this.idCompetition = decodeURI(params["id"]);
      //dispatch action to load the details here.
      this.loadList();
    });
  }

  private loadList(): void {

    this.competitionService.getCompetitionByIdWithoutToken(this.idCompetition)
      .subscribe(competition => {
        this.urlFotos = constants.PATH_FOTOS;
        this.competition = competition;
      }
      );
    this.videoService.getVideos(this.idCompetition, 'Generado').subscribe(data => {
      this.dataSource.data = this.videoService.convertObjectToDto(data);
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
