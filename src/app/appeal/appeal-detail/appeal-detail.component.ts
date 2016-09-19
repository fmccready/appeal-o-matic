import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css']
})
export class AppealDetailComponent implements OnInit {
  private appeal: Appeal = new Appeal();
  appealSubject: BehaviorSubject<Appeal> = new BehaviorSubject(this.appeal);
  private qsAppealId: any;
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.subscribeToAppealFromQueryString();
  }
  subscribeToAppealFromQueryString() {
    this.route.params
      .subscribe(data => {
        this.qsAppealId = data;
        if (this.qsAppealId.hasOwnProperty('appealId')){
          this.appealService.getAppealWithCampaign(this.qsAppealId.appealId).subscribe(
            appealData => {
              if (appealData){
                this.appeal = appealData.json();
                this.appealSubject.next(this.appeal);
              }
            },
            error => {console.log(error);}
          );
        }
      });
  }

  onInfoSaved(appeal) {
    this.appealService.updateAppeal(appeal);
    this.appealSubject.next(appeal);
  }
  onContentSaved(appeal){
    this.appealService.updateAppeal(appeal);
    this.appealSubject.next(appeal);
  }
  onCodesSaved(appeal){
    this.appealService.updateAppeal(appeal);
    this.appealSubject.next(appeal);
  }
  onSignoffsSaved(appeal){
    this.appealService.updateAppeal(appeal);
    this.appealSubject.next(appeal);
  }

  ngOnInit() {
  }

}
