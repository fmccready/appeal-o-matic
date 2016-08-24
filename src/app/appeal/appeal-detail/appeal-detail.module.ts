import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

import { AppealDetailComponent } from './appeal-detail.component';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import {TimepickerComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap-rc5/ng2-bootstrap';

import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

@NgModule({
  imports: [
    SharedModule,
    ActivatedRoute
  ],
  declarations: [
    AppealDetailComponent,
    DatePipe,
    TimepickerComponent,
    DATEPICKER_DIRECTIVES,
    moment
  ],
  providers: [
    CampaignService,
    AppealService
  ]
})
export class AppealDetailModule {}
