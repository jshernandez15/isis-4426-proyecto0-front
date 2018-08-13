import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Boolean = false;
  isCollapsed: Boolean = true;
  authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.handleAuth();
  }

  private handleAuth(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
