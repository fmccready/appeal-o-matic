import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherAppealComponent } from './other-appeal/other-appeal.component';
import { StandardAppealComponent } from './standard-appeal/standard-appeal.component';
import { PlainTextPipe } from '../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../remove-html.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OtherAppealComponent,
    StandardAppealComponent,
    PlainTextPipe,
    RemoveHtmlPipe
  ],
  exports: [
    OtherAppealComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppealTemplateModule {}
