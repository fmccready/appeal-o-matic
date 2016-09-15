import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';

import { AppealCode } from '../../models/appeal';
import { AppealContent } from '../../models/appeal';
import { AppealInfo } from '../../models/appeal';
import { AppealSignoff } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css']
})
export class AppealDetailComponent implements OnInit {
  private appeal: Appeal = new Appeal();
  appealSubject: BehaviorSubject<Appeal>;
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.route.params
      .subscribe(data => {
        this.subscribeToAppealFromQueryString(data);
      });
  }

  subscribeToAppealFromQueryString(q) {
    this.appealService.getAppealWithCampaign(q.appealId).subscribe(
      data => {
        if (data){
          this.appeal = data.json();
        }
      },
      error => {console.log(error);}
    );
  }

  onInfoSaved(appeal) {
    console.log('before');
    console.log(this.appeal);
    this.appealService.updateAppeal(appeal);
    console.log('after');
    console.log(appeal);
  }
  onContentSaved(appeal){
    this.appealService.updateAppeal(appeal);
  }
  onCodesSaved(appeal){
    this.appealService.updateAppeal(appeal);
  }
  onSignoffsSaved(appeal){
    this.appealService.updateAppeal(appeal);
  }

  ngOnInit() {
  }

}
