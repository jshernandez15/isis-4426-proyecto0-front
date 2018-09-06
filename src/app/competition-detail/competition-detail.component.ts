import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../model/competition.model';
import { CompetitionService } from '../service/competition.service';
import { VideoService } from '../service/video.service';
import { Video } from '../model/video.model';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent implements OnInit {

  competition: Competition;

  videos: Video[];

  private sub: any;

  constructor(private videoService: VideoService, private competitionService: CompetitionService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.videos = [];
    this.sub = this.router.params.subscribe(params => {
      this.loadCompetition(params['id']);
    });
  }

  private loadCompetition(id: number): void {
    this.competitionService.getCompetitionById(id)
      .subscribe(competition => {
        this.competition = competition;
        this.loadVideos(competition.id);
      });
  }

  private loadVideos(competitionId: number): void {
    this.videoService.getVideosById(competitionId)
      .subscribe(videos => this.videos = this.videoService.convertObjectToDto(videos));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
