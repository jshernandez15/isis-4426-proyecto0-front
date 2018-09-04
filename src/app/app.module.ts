import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MomentTimezoneModule} from 'angular-moment-timezone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UrlPipe } from './pipe/url.pipe';
import { VideoListComponent } from './public/video-list/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CompetitionComponent,
    LoginComponent,
    RegisterComponent,
    UrlPipe,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentTimezoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
