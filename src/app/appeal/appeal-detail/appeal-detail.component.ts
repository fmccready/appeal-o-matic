import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealCodesComponent } from './appeal-codes/appeal-codes.component';
import { AppealContentComponent } from './appeal-content/appeal-content.component';
import { AppealInfoComponent } from './appeal-info/appeal-info.component';
import { AppealSignoffsComponent } from './appeal-signoffs/appeal-signoffs.component';
import { AppealPreviewComponent } from './appeal-preview/appeal-preview.component';

import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';
import { AppealCode } from '../../models/appeal';
import { AppealContent } from '../../models/appeal';
import { AppealInfo } from '../../models/appeal';
import { AppealSignoff } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css'],
  directives: [AppealInfoComponent, AppealContentComponent, AppealCodesComponent, AppealSignoffsComponent, AppealPreviewComponent]
})
export class AppealDetailComponent implements OnInit {
  appeal: Appeal = new Appeal();
  appealSubject: BehaviorSubject<Appeal> = new BehaviorSubject(this.appeal);
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.route.params
      .subscribe(data => {
        //this.appealService.filterAppeals(data);
        this.subscribeToAppealFromQueryString(data);
      });
  }

  subscribeToAppealFromQueryString(appeal) {
    this.appealService.getAppealWithCampaign(appeal.appealId).subscribe(
      data => {
        this.appeal = data.json();
        this.appealSubject.next(this.appeal);
      },
      error => {console.log(error)}
    );
  }

  subscribeToAppeal(appealId) {
    this.appealService.getAppealWithCampaign(appealId).subscribe(
      data => {
        console.dir(data);
        this.appeal = data.json();
        this.appealSubject.next(this.appeal);
      },
      error => {console.log(error)}
    );
  }

  onInfoSaved(appealInfo) {
    this.appeal.info = appealInfo;
    this.appealService.updateAppeal(this.appeal);
    this.subscribeToAppeal(this.appeal._id);
  }
  onContentSaved(appealContent){
    this.appeal.emailContent = appealContent;
    this.appealService.updateAppeal(this.appeal);
    this.subscribeToAppeal(this.appeal._id);
  }
  onCodesSaved(appealCodes){
    this.appeal.codes = appealCodes;
    this.appealService.updateAppeal(this.appeal);
    this.subscribeToAppeal(this.appeal._id);
  }
  onSignoffsSaved(appealSignoffs){
    this.appeal.signoffs = appealSignoffs;
    this.appealService.updateAppeal(this.appeal);
    this.subscribeToAppeal(this.appeal._id);
  }

  ngOnInit() {
  }

}
