import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Event } from '../model/event.model'

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) {}
    
    getEvents(): Observable<Event[]> {
        const options = {
            headers: new HttpHeaders({
                'x-access-token': localStorage.getItem('token'),
                'Accept': 'application/json'
            })
        };
        return this.http.get<any>(environment.api + '/event', options);
    }

    deleteEvent(index: number): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'x-access-token': localStorage.getItem('token'),
                'Accept': 'application/json'
            })
        };
        return this.http.delete<any>(environment.api + '/event/' + index, options);
    }

}