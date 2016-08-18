import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { AppealService } from '../appeal.service';
import { Appeal } from '../models/appeal';

import { AppealInfoComponent } from './appeal-info/appeal-info.component';
import { AppealContentComponent } from './appeal-content/appeal-content.component';
import { AppealCodesComponent } from './appeal-codes/appeal-codes.component';
import { AppealSignoffsComponent } from './appeal-signoffs/appeal-signoffs.component';


import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'app/appeal-detail/appeal-detail.component.html',
  styleUrls: ['app/appeal-detail/appeal-detail.component.css'],
  directives: [AppealInfoComponent, AppealContentComponent, AppealCodesComponent, AppealSignoffsComponent],
  pipes: [DatePipe],
  providers: [Appeal]
})
export class AppealDetailComponent implements OnInit {
  appeal$: Observable<Appeal[]>;
  appeal: Appeal = new Appeal();

  constructor(private appealService: AppealService, private route: ActivatedRoute) {

    this.route.params
      .subscribe(data => {
        this.appealService.filterAppeals(data);
        this.subscribeToAppeal(data);
      });


  }
  subscribeToAppeal(appeal) {
    this.appealService.getAppeals().subscribe(
      data => {
        if (data.length && (data[0]._id == appeal.appealId)){
            this.appeal = data[0];
        }
      },
      error => {console.log(error)}
    );
  }

  onSaved(appealInfo) {
    this.appeal.info = appealInfo;
    this.appealService.updateAppeal(this.appeal);
  }

  ngOnInit() {
  }

  saveAppeal(){

  }
}
