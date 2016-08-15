import {ROUTER_DIRECTIVES, provideRouter, RouterConfig} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {FiltersComponent} from './filters/filters.component';
import {NewCampaignComponent} from './new-campaign/new-campaign.component';
import {NewAppealComponent} from './new-appeal/new-appeal.component';
import {AppealDetailComponent} from './appeal-detail/appeal-detail.component';
import {provide} from '@angular/core';

const routes: RouterConfig = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent },
  { path: 'new-campaign', component: NewCampaignComponent},
  { path: 'new-appeal', component: NewAppealComponent },
  { path: 'appeal/:appealId', component: AppealDetailComponent }
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

export const locStrat = provide(LocationStrategy, {useClass: HashLocationStrategy});
