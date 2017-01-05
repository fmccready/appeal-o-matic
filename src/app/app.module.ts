import { NgModule } from '@angular/core' ;
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ModalModule, DatepickerModule, TimepickerModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

import { AppealModule } from './appeal/appeal.module';
import { CampaignModule } from './campaign/campaign.module';
import { AppealDetailModule } from './appeal/appeal-detail/appeal-detail.module';

import { CampaignService } from './campaign.service';
import { AppealService } from './appeal.service';

import { routing, appRoutingProviders } from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AppealModule,
    CampaignModule,
    AppealDetailModule,
    ModalModule,
    DatepickerModule,
    TimepickerModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    CampaignService,
    AppealService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule{ }
