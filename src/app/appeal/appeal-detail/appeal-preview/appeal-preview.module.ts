import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealPreviewComponent } from './appeal-preview.component';
import { PlainTextPipe } from '../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../remove-html.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppealPreviewComponent,
    PlainTextPipe,
    RemoveHtmlPipe
  ],
  exports: [
    AppealPreviewComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppealPreviewModule {}
