import { NgModule } from '@angular/core' ;
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TimepickerComponent, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap-rc5/ng2-bootstrap';
import * as moment from 'moment';
import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { FiltersComponent } from './appeal/filters/filters.component';
import { AppealListComponent } from './appeal/appeal-list/appeal-list.component';
import { NewCampaignComponent } from './campaign/new-campaign/new-campaign.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { AppealDetailComponent } from './appeal/appeal-detail/appeal-detail.component';
import { NewAppealComponent } from './appeal/new-appeal/new-appeal.component';
import { CampaignService } from './campaign.service';
import { AppealService } from './appeal.service';
import { Auth } from './auth.service';

import { routing, appRoutingProviders } from './app.routes';
import { LoginComponent } from './login/login.component';
import { PlainTextPipe } from './plain-text.pipe';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  declarations: [
    AppComponent,
    FiltersComponent,
    AppealListComponent,
    NewCampaignComponent,
    CampaignListComponent,
    TimepickerComponent,
    DATEPICKER_DIRECTIVES,
    AppealDetailComponent,
    NewAppealComponent,
    LoginComponent, PlainTextPipe
  ],
  providers: [
    appRoutingProviders,
    CampaignService,
    AppealService,
    Auth,
    LocalStorageService,
    AUTH_PROVIDERS,
    moment
  ],
  bootstrap: [AppComponent],
})
export class AppModule{}
