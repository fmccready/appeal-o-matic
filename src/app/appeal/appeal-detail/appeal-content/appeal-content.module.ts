import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppealContentComponent } from './appeal-content.component';
import { RestoreService } from '../../../restore.service';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports : [
    CKEditorModule,
    FormsModule
  ],
  declarations: [
    AppealContentComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealContentComponent
  ]
})
export class AppealContentModule {}
