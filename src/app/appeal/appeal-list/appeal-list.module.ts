import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealListComponent } from './appeal-list.component';
import { routing } from '../appeal.routes';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        AppealListComponent
    ],
    exports: [
        AppealListComponent
    ]
})
export class AppealListModule {}