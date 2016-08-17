import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { AppealService } from '../appeal.service';
import { Appeal } from '../models/appeal';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign';

import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'app/appeal-detail/appeal-detail.component.html',
  styleUrls: ['app/appeal-detail/appeal-detail.component.css'],
  directives: [NKDatetime],
  pipes: [DatePipe],
  providers: [Appeal]
})
export class AppealDetailComponent implements OnInit {
  appeal$: Observable<Appeal[]>;
  appeal: Appeal = new Appeal();
  private campaigns: Campaign[];
  constructor(private appealService: AppealService, private campaignService: CampaignService, private route: ActivatedRoute) {


    this.route.params
      .subscribe(data => {
        this.appealService.filterAppeals(data);
        this.subscribeToAppeal(data);
      });

    this.campaignService.getCampaigns().subscribe(
        data => {this.campaigns = data},
        error => {console.log(error)}
      );
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

  ngOnInit() {
  }

  saveAppeal(){

  }
}
