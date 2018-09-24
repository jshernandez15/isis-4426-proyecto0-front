import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { CompetitionComponent } from './competition/competition.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UrlPipe } from './pipe/url.pipe';
import { VideoListComponent } from './public/video-list/video-list.component';
import { RegisterComponent } from './register/register.component';
import { StatusCreateComponent } from './status-create/status-create.component';
import { UploadComponent } from './upload/upload.component';
import { FileUploadClientService } from './upload/upload.service';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CompetitionComponent,
    LoginComponent,
    RegisterComponent,
    UrlPipe,
    VideoListComponent,
    UploadComponent,
    StatusCreateComponent,
    CompetitionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentTimezoneModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule
  ],
  providers: [FileUploadClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
