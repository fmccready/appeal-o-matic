import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppealContentComponent } from './appeal-content.component';
import { RestoreService } from '../../../restore.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { PhotoCropComponent } from '../../photo-crop/photo-crop.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
  imports : [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ModalModule
  ],
  declarations: [
    AppealContentComponent,
    PhotoCropComponent,
    ImageCropperComponent,
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealContentComponent,
    PhotoCropComponent,
    ImageCropperComponent
  ]
})
export class AppealContentModule {}
