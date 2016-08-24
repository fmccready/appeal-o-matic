import { Routes, RouterModule } from '@angular/router';

import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'new-campaign', pathMatch: 'full' },
  { path: 'new-campaign', component: NewCampaignComponent },
];

export const routing = RouterModule.forChild(routes);
