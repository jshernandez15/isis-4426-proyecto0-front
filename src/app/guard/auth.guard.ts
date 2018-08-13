import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    
    constructor(public auth: AuthService, public router: Router) {}
    
    canActivate() {
        return this.auth.isLoggedIn.pipe(map(next => {
            if (next) {
                return true;
            }
            else {
                this.router.navigate(['/']);
                return false;
            }
        }));
    }  
}