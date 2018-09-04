import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { VideoListComponent } from './public/video-list/video-list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'competitions',
    component: CompetitionComponent,
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
    path: 'public/:url',
    component: VideoListComponent
  },
  {
    path: 'upload',
    component: UploadComponent
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
