import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppealCodesComponent } from './appeal-codes.component';
import { RestoreService } from '../../../restore.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    AppealCodesComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealCodesComponent
  ]
})
export class AppealCodesModule {}
