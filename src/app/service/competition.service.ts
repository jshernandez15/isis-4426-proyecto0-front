import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Competition } from '../model/competition.model'

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    constructor(private http: HttpClient) {}

    getOptions(): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'x-access-token': localStorage.getItem('token'),
                'Accept': 'application/json'
            })
        };
    }
    
    getCompetitions(): Observable<Competition[]> {
        return this.http.get<any>(environment.api + '/competition', this.getOptions());
    }

    deleteCompetition(index: number): Observable<any> {
        return this.http.delete<any>(environment.api + '/competition/' + index, this.getOptions());
    }

    requestFromCompetition(competition: Competition) {
        return {
            ...competition, 
            init: competition.init.year + "-" + competition.init.month + "-" + competition.init.day, 
            end: competition.end.year + "-" + competition.end.month + "-" + competition.end.day
        };
    }

    createCompetition(competition: Competition): Observable<any> {
        return this.http.post<any>(
            environment.api + '/competition/', 
            this.requestFromCompetition(competition), 
            this.getOptions());
    }

    editCompetition(competition: Competition): Observable<any> {
        return this.http.put<any>(
            environment.api + '/competition/' + competition.id, 
            this.requestFromCompetition(competition), 
            this.getOptions());
    }

}