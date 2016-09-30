import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardAppealComponent } from './us-appeals/standard-appeal/standard-appeal.component';
import { HHDAppealComponent } from './us-appeals/hhd-appeal/appeal-hhd.component';
import { HHDLargeAppealComponent } from './us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { CANHHDAppealComponent } from './can-appeals/can-hhd-appeal/can-appeal-hhd.component';

import { PlainTextPipe } from '../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../remove-html.pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    StandardAppealComponent,
    HHDAppealComponent,
    HHDLargeAppealComponent,
    CANHHDAppealComponent,
    PlainTextPipe,
    RemoveHtmlPipe
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppealTemplateModule {}