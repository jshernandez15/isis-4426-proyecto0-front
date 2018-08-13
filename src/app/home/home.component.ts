import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: Boolean = false;
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

}
