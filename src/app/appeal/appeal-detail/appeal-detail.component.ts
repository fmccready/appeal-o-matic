import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css']
})
export class AppealDetailComponent implements OnInit {
  private appealObs: Observable<Appeal>;
  private appeal: Appeal = new Appeal();
  data = false;
  private qs: any;
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.getAppealFromQueryString();
  }
  getAppealFromQueryString() {
    this.route.params
      .subscribe(queryString => {
        this.qs = queryString;
        if (this.qs.hasOwnProperty('appealId')) {
          this.appealObs = this.appealService.getAppealById(this.qs.appealId);
          this.appealObs.subscribe(data => this.appeal = data);
        }
      });
  }

  onInfoSaved(data) {
    this.appeal.info = data;
    this.appealService.updateAppeal(this.appeal);
  }
  onContentSaved(data) {
    this.appeal.content = data;
    this.appealService.updateAppeal(this.appeal);
  }
  onCodesSaved(data) {
    this.appeal.codes = data;
    this.appealService.updateAppeal(this.appeal);
  }
  onSignoffsSaved(data) {
    this.appeal.signoffs = data;
    this.appealService.updateAppeal(this.appeal);
  }

  ngOnInit() {
  }

}
