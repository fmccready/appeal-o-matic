import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';

import { PhotoCropComponent } from './photo-crop.component';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  imports : [
    CommonModule,
    ModalModule,
    FormsModule,
    CKEditorModule,
    HttpModule
  ],
  declarations: [
    PhotoCropComponent,
    FileUploadComponent
  ],
  exports: [
    PhotoCropComponent,
  ]
})
export class PhotoCropModule {}