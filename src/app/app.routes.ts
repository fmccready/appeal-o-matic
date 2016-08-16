import { Routes, RouterModule } from '@angular/router';
import {FiltersComponent} from './filters/filters.component';
import {NewCampaignComponent} from './new-campaign/new-campaign.component';
import {NewAppealComponent} from './new-appeal/new-appeal.component';
import {AppealDetailComponent} from './appeal-detail/appeal-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent },
  { path: 'new-campaign', component: NewCampaignComponent},
  { path: 'new-appeal', component: NewAppealComponent },
  { path: 'appeal/:appealId', component: AppealDetailComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
