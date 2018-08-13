import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { toUnicode } from 'punycode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

    private token: String;
    
    constructor(private http: HttpClient) {}

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    login(user: User) {
        if (user.name !== '' && user.password != '' ){
            this.requestAuthenticationToken(user).subscribe(
                data => {
                    if( data.auth && 'token' in data ){
                        this.token = data.token;
                        localStorage.setItem('token', this.token.toString());
                        localStorage.setItem('name', user.name.toString());
                        this.loggedIn.next(true);
                    }
                    else {
                        this.loggedIn.next(false);
                    }
                }
            );
        }
        else {
            this.loggedIn.next(false);
        }
    }

    private requestAuthenticationToken(user: User): Observable<any> {
        return this.http.post<any>( environment.api + '/login/', user)
            .pipe(
                catchError(this.handleError('Failure authenticating user', {}))
              );
    }


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    logout() {
        this.requestLogout().subscribe(
            data => {
                if( !data.auth ){
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    this.token = null;
                    this.loggedIn.next(false);
                }
            }
            
        );

    }

    private requestLogout(): Observable<any> {
        return this.http.get<any>( environment.api + '/logout/')
            .pipe(
                catchError(this.handleError('Failure authenticating user', {}))
              );
    }

    register(user: User, callback) {
        this.requestUserCreation(user).subscribe(
            (response) => {
                callback(true);
            },
            (err) => {
                callback(false);
            }
        );
    }

    private requestUserCreation(user: User): Observable<any> {
        return this.http.post( environment.api + '/user/', user);
    }
}