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
    this.appealService.getAppeal(appeal.appealId).subscribe(
      data => {
        this.appeal = data.json();
      },
      error => {console.log(error)}
    );
  }

  onInfoSaved(appealInfo) {
    this.appeal.info = appealInfo;
    this.appealService.updateAppeal(this.appeal);
  }
  onContentSaved(appealContent){
    this.appeal.emailContent = appealContent;
    this.appealService.updateAppeal(this.appeal);
  }
  onCodesSaved(appealCodes){
    this.appeal.codes = appealCodes;
    this.appealService.updateAppeal(this.appeal);
  }
  onSignoffsSaved(appealSignoffs){
    this.appeal.signoffs = appealSignoffs;
    this.appealService.updateAppeal(this.appeal);
  }

  ngOnInit() {
  }

}
