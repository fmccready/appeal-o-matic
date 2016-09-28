import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { AppealDetailComponent } from './appeal/appeal-detail/appeal-detail.component';
import { AppealPreviewComponent } from './appeal/appeal-detail/appeal-preview/appeal-preview.component';
import { FiltersComponent } from './appeal/filters/filters.component';
import { NewAppealComponent } from './appeal/new-appeal/new-appeal.component';
import { NewCampaignComponent } from './campaign/new-campaign/new-campaign.component';

const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  {
    path: 'appeal/:appealId',
    component: AppealDetailComponent,
    children: [
      {
        path: '',
        component: AppealPreviewComponent
      },
      {
        path: 'standardAppeal',
        component: AppealPreviewComponent
      }
    ]
  },
  { path: 'filters', component: FiltersComponent },
  { path: 'new-appeal', component: NewAppealComponent },
  { path: 'new-campaign', component: NewCampaignComponent }
];

export const appRoutingProviders: any[] = [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const routing = RouterModule.forRoot(routes);
