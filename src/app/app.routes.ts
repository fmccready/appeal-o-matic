import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { AppealDetailComponent } from './appeal/appeal-detail/appeal-detail.component';

import { FiltersComponent } from './appeal/filters/filters.component';
import { NewAppealComponent } from './appeal/new-appeal/new-appeal.component';
import { NewCampaignComponent } from './campaign/new-campaign/new-campaign.component';

import { StandardAppealComponent } from './appeal/appeal-detail/appeal-templates/us-appeals/standard-appeal/standard-appeal.component';
import { HHDAppealComponent } from './appeal/appeal-detail/appeal-templates/us-appeals/hhd-appeal/appeal-hhd.component';
import { HHDLargeAppealComponent } from './appeal/appeal-detail/appeal-templates/us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { CANHHDAppealComponent } from './appeal/appeal-detail/appeal-templates/can-appeals/can-hhd-appeal/can-appeal-hhd.component';
import { OtherAppealComponent } from './appeal/appeal-detail/appeal-templates/other-appeal/other-appeal.component';

const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  {
    path: 'appeal/:appealId',
    component: AppealDetailComponent,
    children: [
      {
        path: '',
        component: StandardAppealComponent
      },
      {
        path: 'undefined',
        component: StandardAppealComponent
      },
      {
        path: 'standardAppeal',
        component: StandardAppealComponent
      },
      {
        path: 'hhdAppeal',
        component: HHDAppealComponent
      },
      {
        path: 'hhdLargeAppeal',
        component: HHDLargeAppealComponent
      },
      {
        path: 'canhhdAppeal',
        component: CANHHDAppealComponent
      },
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
