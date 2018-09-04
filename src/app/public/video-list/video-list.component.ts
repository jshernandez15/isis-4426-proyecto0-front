import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  url: string;

  private sub: any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
       this.url = decodeURI(params['url'].replace(/-/g, " "));

       //dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
