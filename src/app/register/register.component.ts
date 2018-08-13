import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { PasswordValidator } from '../validator/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userform: FormGroup;

  submitted: boolean;

  firstTime: boolean;

  authSubscription: Subscription;

  message: any;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.firstTime = true;
    this.userform = this.fb.group({
        'name': new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        'confirmPassword': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    }, {
      validator: PasswordValidator.MatchPassword // your validation method
    });
  }

  onSubmit(value: string) {
    var context = this;
    if ( this.userform.valid ) {
        this.authService.register(this.userform.value, function(status){
          if ( status ){
            alert('Usuario creado, por favor acceda al sitio');
            context.router.navigateByUrl("login");
          }
          else {
            context.submitted = false;
            if( !context.firstTime ){
              context.message = {
                summary:'Falló el registro!', 
                detail:'Por favor intenta nuevamente en un momento.'
              };
            }
            context.firstTime = false;
          }
        });
    }
    this.submitted = true;
  }

}