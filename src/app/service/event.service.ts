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

    getOptions(): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                'x-access-token': localStorage.getItem('token'),
                'Accept': 'application/json'
            })
        };
    }
    
    getEvents(): Observable<Event[]> {
        return this.http.get<any>(environment.api + '/event', this.getOptions());
    }

    deleteEvent(index: number): Observable<any> {
        return this.http.delete<any>(environment.api + '/event/' + index, this.getOptions());
    }

    requestFromEvent(event: Event) {
        return {
            ...event, 
            init: event.init.year + "-" + event.init.month + "-" + event.init.day, 
            end: event.end.year + "-" + event.end.month + "-" + event.end.day
        };
    }

    createEvent(event: Event): Observable<any> {
        return this.http.post<any>(environment.api + '/event/', this.requestFromEvent(event), this.getOptions());
    }

    editEvent(event: Event): Observable<any> {
        return this.http.put<any>(environment.api + '/event/' + event.id, this.requestFromEvent(event), this.getOptions());
    }

}