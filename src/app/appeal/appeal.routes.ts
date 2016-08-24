import { Routes, RouterModule } from '@angular/router';

import {FiltersComponent} from './filters/filters.component';
import {NewAppealComponent} from './new-appeal/new-appeal.component';
import {AppealDetailComponent} from './appeal-detail/appeal-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent },
  { path: 'new-appeal', component: NewAppealComponent },
  { path: 'appeal/:appealId', component: AppealDetailComponent }
];

export const routing = RouterModule.forChild(routes);
