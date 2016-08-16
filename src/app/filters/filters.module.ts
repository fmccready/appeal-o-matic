import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FiltersComponent } from './filters.component';

import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FiltersComponent
  ],
  providers: [
    CampaignService,
    AppealService
  ]
})
export class FiltersModule {}
