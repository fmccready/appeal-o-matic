import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimepickerComponent, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap-rc5/ng2-bootstrap';
import * as moment from 'moment';

import { SharedModule } from '../shared/shared.module';
import { CampaignService } from '../campaign.service';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { routing } from './campaign.routes';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    routing,
    moment
  ],
  declarations: [
    CampaignListComponent,
    TimepickerComponent,
    DATEPICKER_DIRECTIVES,
    DatePipe
  ],
  providers: [
    CampaignService
  ]
})
export class CampaignModule {}
