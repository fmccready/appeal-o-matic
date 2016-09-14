import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AppealDetailModule } from './appeal-detail/appeal-detail.module';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';
import { FiltersComponent } from './filters/filters.component';
import { AppealListComponent } from './appeal-list/appeal-list.component';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { routing } from './appeal.routes';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    AppealDetailModule,
    routing,
    TimepickerModule,
    DatepickerModule
  ],
  declarations: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent
  ],
  providers: [
    CampaignService,
    AppealService
  ],
  exports: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent
  ]
})
export class AppealModule {}
