import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

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
  }
}
