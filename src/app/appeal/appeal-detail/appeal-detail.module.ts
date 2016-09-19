import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AppealDetailComponent } from './appeal-detail.component';

import { AppealContentModule } from './appeal-content/appeal-content.module';
import { AppealCodesModule } from './appeal-codes/appeal-codes.module';
import { AppealInfoModule } from './appeal-info/appeal-info.module';
import { AppealSignoffsModule } from './appeal-signoffs/appeal-signoffs.module';
import { AppealPreviewModule } from './appeal-preview/appeal-preview.module';

import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

import { AppealCode } from '../../models/appeal';
import { AppealContent } from '../../models/appeal';
import { AppealInfo } from '../../models/appeal';
import { AppealSignoff } from '../../models/appeal';

@NgModule({
  imports: [
    SharedModule,
    AppealContentModule,
    AppealCodesModule,
    AppealInfoModule,
    AppealSignoffsModule,
    AppealPreviewModule
  ],
  declarations: [
    AppealDetailComponent
  ],
  providers: [
    CampaignService,
    AppealService,
    AppealCode,
    AppealContent,
    AppealInfo,
    AppealSignoff
  ]
})
export class AppealDetailModule {}
