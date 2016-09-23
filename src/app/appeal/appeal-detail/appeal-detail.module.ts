import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AppealDetailComponent } from './appeal-detail.component';

import { AppealContentModule } from './appeal-content/appeal-content.module';
import { AppealCodesModule } from './appeal-codes/appeal-codes.module';
import { AppealInfoModule } from './appeal-info/appeal-info.module';
import { AppealSignoffsModule } from './appeal-signoffs/appeal-signoffs.module';
import { AppealPreviewModule } from './appeal-preview/appeal-preview.module';

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
})
export class AppealDetailModule {}
