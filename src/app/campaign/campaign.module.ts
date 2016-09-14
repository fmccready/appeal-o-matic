import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CampaignService } from '../campaign.service';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { routing } from './campaign.routes';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    routing,
    TimepickerModule,
    DatepickerModule
  ],
  declarations: [
    CampaignListComponent,
    NewCampaignComponent
  ],
  providers: [
    CampaignService
  ]
})
export class CampaignModule {}
