import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealDetailComponent } from './appeal-detail.component';

import { AppealContentModule } from './appeal-content/appeal-content.module';
import { AppealCodesModule } from './appeal-codes/appeal-codes.module';
import { AppealInfoModule } from './appeal-info/appeal-info.module';
import { AppealSignoffsModule } from './appeal-signoffs/appeal-signoffs.module';
import { AppealPreviewModule } from './appeal-preview/appeal-preview.module';

@NgModule({
  imports: [
    AppealContentModule,
    AppealCodesModule,
    AppealInfoModule,
    AppealSignoffsModule,
    AppealPreviewModule,
    CommonModule
  ],
  declarations: [
    AppealDetailComponent
  ],
})
export class AppealDetailModule {}
