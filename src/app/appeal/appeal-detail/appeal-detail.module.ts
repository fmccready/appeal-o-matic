import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppealDetailComponent } from './appeal-detail.component';

import { AppealContentModule } from './appeal-content/appeal-content.module';
import { AppealCodesModule } from './appeal-codes/appeal-codes.module';
import { AppealInfoModule } from './appeal-info/appeal-info.module';
import { AppealSignoffsModule } from './appeal-signoffs/appeal-signoffs.module';
import { AppealPreviewModule } from './appeal-preview/appeal-preview.module';

import { PreviewService } from './../../preview.service';

@NgModule({
  imports: [
    AppealContentModule,
    AppealCodesModule,
    AppealInfoModule,
    AppealSignoffsModule,
    AppealPreviewModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    AppealDetailComponent
  ],
  providers: [
    PreviewService
  ]
})
export class AppealDetailModule {}
