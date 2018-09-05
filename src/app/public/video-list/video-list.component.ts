import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../service/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  url: string;
  videos: any[] = [];

  private sub: any;

  constructor(private router: ActivatedRoute, private videoService: VideoService) { }


  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.url = decodeURI(params['url'].replace(/-/g, " "));

      //dispatch action to load the details here.
      this.loadList();
    });
  }

  private loadList(): void {
    this.videoService.getVideos(1)
      .subscribe(data => {
        console.log(data);
        this.videos = this.videoService.convertObjectToDto(data);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
