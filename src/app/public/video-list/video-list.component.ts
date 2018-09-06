import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VideoService } from "../../service/video.service";
import { Video } from "../../model/video.model";

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

  private sub: any;

  constructor(
    private router: ActivatedRoute,
    private videoService: VideoService,
    private route: Router
  ) {}

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
    this.videoService.getVideos(this.idCompetition).subscribe(data => {
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
