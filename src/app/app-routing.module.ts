import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guard/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegisterComponent
  },
  { 
    path: '**',
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
