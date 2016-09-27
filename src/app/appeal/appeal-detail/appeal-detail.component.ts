import { Component, OnInit, ViewChild } from '@angular/core';
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
  private appeal: Appeal;
  data = false;
  private qs: any;
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.getAppealFromQueryString();
  }
  @ViewChild('preview') preview;
  getAppealFromQueryString() {
    this.route.params
      .subscribe(queryString => {
        this.qs = queryString;
        if (this.qs.hasOwnProperty('appealId')) {
          this.appealService.getAppealById(this.qs.appealId).subscribe(data => {this.appeal = data; if (data.hasOwnProperty('_id')){ this.data = true; }});
        }
      });
  }

  onInfoSaved(data) {
    this.appeal.info = data;
    this.appealService.updateAppeal(this.appeal);
    this.preview.generateBody();
  }
  onContentSaved(data) {
    this.appeal.content = data;
    this.appealService.updateAppeal(this.appeal);
    this.preview.generateBody();
  }
  onCodesSaved(data) {
    this.appeal.codes = data;
    this.appealService.updateAppeal(this.appeal);
    this.preview.generateBody();
  }
  onSignoffsSaved(data) {
    this.appeal.signoffs = data;
    this.appealService.updateAppeal(this.appeal);
    this.preview.generateBody();
  }

  ngOnInit() {
  }

}
