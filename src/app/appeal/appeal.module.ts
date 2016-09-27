import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppealDetailModule } from './appeal-detail/appeal-detail.module';
import { FiltersComponent } from './filters/filters.component';
import { AppealListComponent } from './appeal-list/appeal-list.component';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { routing } from './appeal.routes';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    AppealDetailModule,
    routing,
    TimepickerModule,
    DatepickerModule,
    CommonModule
  ],
  declarations: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent
  ],
  exports: [
    FiltersComponent,
    AppealListComponent,
    NewAppealComponent
  ]
})
export class AppealModule {}
