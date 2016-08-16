import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import '../rxjs-operators';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { Campaign } from '../models/campaign';
import { IAppeal, Appeal } from '../models/appeal';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';
import { AppealListComponent } from '../appeal-list/appeal-list.component';


@Component({
  selector: 'app-new-appeal',
  templateUrl: 'app/new-appeal/new-appeal.component.html',
  styleUrls: ['app/new-appeal/new-appeal.component.css'],
  directives: [NKDatetime, AppealListComponent],
  pipes: [DatePipe],
  providers: [IAppeal]
})
export class NewAppealComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  appeal: IAppeal = new Appeal();

  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = this.campaignService.getCampaigns();
  }
  appealSubmit(){
    this.appealService.addAppeal(this.appeal);
    this.campaignService.loadCampaigns();
  }
  ngOnInit() {
    console.dir(this.appeal);
  }

}
