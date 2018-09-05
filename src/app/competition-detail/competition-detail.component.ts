import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../model/competition.model';
import { CompetitionService } from '../service/competition.service';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent implements OnInit {

  competition: Competition;

  private sub: any;

  constructor(private competitionService: CompetitionService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.loadCompetition(params['id']);
    });
  }

  private loadCompetition(id: number): void {
    this.competitionService.getCompetitionById(id)
          .subscribe(competition => this.competition = competition);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
