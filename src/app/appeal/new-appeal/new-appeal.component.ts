import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Appeal, AppealInfo } from '../../models/appeal';
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
  appeal = <AppealInfo>{};
  sendTime: Date = new Date();
  appeals: Appeal[];
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.appealService.getAppeals().subscribe(
      data => {this.appeals = data; }
    );
  }
  
  appealSubmit(){
    var mins = this.sendTime.getMinutes();
    var hours = this.sendTime.getHours();
    if (this.appeal.hasOwnProperty('sendDate')){
      this.appeal.sendDate.setMinutes(mins);
      this.appeal.sendDate.setHours(hours);
    }
    this.appealService.addAppeal(this.appeal);
    this.campaignService.loadCampaigns();
  }
  ngOnInit() {
  }
}
