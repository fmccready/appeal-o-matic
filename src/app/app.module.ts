import { NgModule } from '@angular/core' ;
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';

import { AppealModule } from './appeal/appeal.module';
import { CampaignModule } from './campaign/campaign.module';
import { AppealDetailModule } from './appeal/appeal-detail/appeal-detail.module';

import { CampaignService } from './campaign.service';
import { AppealService } from './appeal.service';

import { Auth } from './auth.service';

import { routing, appRoutingProviders } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AppealModule,
    CampaignModule,
    AppealDetailModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    CampaignService,
    AppealService,
    Auth,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule{}
