import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: FormGroup;

  submitted: boolean;

  firstTime: boolean;

  authSubscription: Subscription;

  messages: any[];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.messages = [];
    this.firstTime = true;
    this.userform = this.fb.group({
        'name': new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    this.handleAuth();
  }

  onSubmit(value: string) {
    if ( this.userform.valid ) {
        this.authService.login(this.userform.value);
    }
    this.submitted = true;
  }

  private handleAuth(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe(authStatus => {
      if ( authStatus ){
        this.router.navigateByUrl("events");
      }
      else {
        this.submitted = false;
        if( !this.firstTime ){
          this.messages.push({severity:'danger', summary:'Falló el login', detail:'Tu correo o contraseña no son válidos!'});
        }
        this.firstTime = false;
      }
    });
  }

}