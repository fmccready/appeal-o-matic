import { Component, OnInit, Input } from '@angular/core';
import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';

@Component({
    selector: 'duplicate-appeal',
    templateUrl: 'duplicate-appeal.component.html',
    styleUrls: ['duplicate-appeal.component.css']
})
export class DuplicateAppealComponent implements OnInit {
    @Input() appeal: Appeal;

    constructor(private appealService:AppealService){

    }

    duplicate(){
        console.log(this.appeal);
    }
    ngOnInit(){
        console.log('init');
    }
}