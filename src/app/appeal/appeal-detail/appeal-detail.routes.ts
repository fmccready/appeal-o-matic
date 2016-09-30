import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StandardAppealComponent } from './appeal-templates/us-appeals/standard-appeal/standard-appeal.component';
import { HHDAppealComponent } from './appeal-templates/us-appeals/hhd-appeal/appeal-hhd.component';
import { HHDLargeAppealComponent } from './appeal-templates/us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { CANHHDAppealComponent } from './appeal-templates/can-appeals/can-hhd-appeal/can-appeal-hhd.component';

const appealDetailRoutes: Routes = [
    {
        path: 'undefined',
        component: StandardAppealComponent,
    },
    {
        path: 'standardAppeal',
        component: StandardAppealComponent,
    },
    {
        path: 'hhdAppeal',
        component: HHDAppealComponent,
    },
    {
        path: 'hhdLargeAppeal',
        component: HHDLargeAppealComponent,
    },
    {
        path: 'canhhdAppeal',
        component: CANHHDAppealComponent,
    },

];

export const appealDetailRouting: ModuleWithProviders = RouterModule.forChild(appealDetailRoutes);