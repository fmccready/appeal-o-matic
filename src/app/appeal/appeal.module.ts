import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {TimepickerComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap-rc5/ng2-bootstrap';
import * as moment from 'moment';

import { SharedModule } from '../shared/shared.module';
import { AppealDetailModule } from './appeal-detail/appeal-detail.module';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';
import { FiltersComponent } from './filters/filters.component';
import { AppealListComponent } from './appeal-list/appeal-list.component';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { routing } from './appeal.routes';

@NgModule({
  imports: [
    SharedModule,
    AppealDetailModule,
    routing,
    ActivatedRoute,
    moment
  ],
  declarations: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent,
    TimepickerComponent,
    DATEPICKER_DIRECTIVES,
    DatePipe
  ],
  providers: [
    CampaignService,
    AppealService
  ],
  exports: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent,
    TimepickerComponent,
    DATEPICKER_DIRECTIVES,
    DatePipe
  ]
})
export class AppealModule {}
