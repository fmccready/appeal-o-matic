import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppealNotesComponent } from './appeal-notes.component';
import { RestoreService } from '../../../restore.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppealNotesComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealNotesComponent
  ]
})
export class AppealNotesModule {}
