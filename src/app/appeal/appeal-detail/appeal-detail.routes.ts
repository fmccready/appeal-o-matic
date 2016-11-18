import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StandardAppealComponent } from './appeal-templates/us-appeals/standard-appeal/standard-appeal.component';
import { FastAppealComponent } from './appeal-templates/us-appeals/fast-appeal/fast-appeal.component';
import { HHDAppealComponent } from './appeal-templates/us-appeals/hhd-appeal/appeal-hhd.component';
import { HHDLargeAppealComponent } from './appeal-templates/us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { CANHHDAppealComponent } from './appeal-templates/can-appeals/can-hhd-appeal/can-appeal-hhd.component';
import { CANHHDLargeAppealComponent } from './appeal-templates/can-appeals/can-hhd-appeal-large-img/can-appeal-hhd-large-img.component';
import { CANStandardAppealComponent } from './appeal-templates/can-appeals/can-standard-appeal/can-appeal-standard.component';
import { CANFastAppealComponent } from './appeal-templates/can-appeals/can-fast-appeal/can-appeal-fast.component';


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
        path: 'fastAppeal',
        component: FastAppealComponent,
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
    {
        path: 'canhhdLargeAppeal',
        component: CANHHDLargeAppealComponent,
    },
    {
        path: 'canStandardAppeal',
        component: CANStandardAppealComponent,
    },
    {
        path: 'canFastAppeal',
        component: CANFastAppealComponent,
    },
];

export const appealDetailRouting: ModuleWithProviders = RouterModule.forChild(appealDetailRoutes);