import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealPreviewComponent } from './appeal-preview.component';
import { RestoreService } from '../../../restore.service';
import { PlainTextPipe } from '../../../plain-text.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppealPreviewComponent,
    PlainTextPipe
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealPreviewComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppealPreviewModule {}
