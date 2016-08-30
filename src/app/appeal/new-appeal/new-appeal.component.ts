import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Appeal } from '../../models/appeal';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

@Component({
  selector: 'app-new-appeal',
  templateUrl: 'new-appeal.component.html',
  styleUrls: ['new-appeal.component.css'],
})
export class NewAppealComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  appeal: Appeal = new Appeal();
  sendTime: Date = new Date();
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = this.campaignService.getCampaigns();
  }
  appealSubmit(){
    var mins = this.sendTime.getMinutes();
    var hours = this.sendTime.getHours();
    if (this.appeal.info.hasOwnProperty('sendDate')){
      this.appeal.info.sendDate.setMinutes(mins);
      this.appeal.info.sendDate.setHours(hours);
    }
    this.appealService.addAppeal(this.appeal);
    this.appeal = new Appeal();
    this.campaignService.loadCampaigns();
  }
  ngOnInit() {
  }
}
