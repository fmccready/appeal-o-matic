import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from './filters/filters.component';
import { AppealListModule } from './appeal-list/appeal-list.module';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { routing } from './appeal.routes';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { PreviewService } from './../preview.service';


@NgModule({
  imports: [
    routing,
    TimepickerModule,
    DatepickerModule,
    CommonModule,
    AppealListModule
  ],
  declarations: [
    FiltersComponent,
    NewAppealComponent
  ],
  exports: [
    FiltersComponent,
    NewAppealComponent
  ],
  providers: [
    PreviewService
  ],

})
export class AppealModule {}
