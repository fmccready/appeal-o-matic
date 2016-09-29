import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Appeal, AppealInfo } from '../../models/appeal';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

import { PreviewService, Template } from '../../preview.service';


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
  private templates: Array<Template>;
  constructor(private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.appealService.getAppeals().subscribe(
      data => { this.appeals = data; }
    );
    this.templates = previewService.templates;
  }
  
  appealSubmit(){
    var mins = this.sendTime.getMinutes();
    var hours = this.sendTime.getHours();
    if (this.appeal.hasOwnProperty('sendDate')){
      this.appeal.sendDate.setMinutes(mins);
      this.appeal.sendDate.setHours(hours);
    }
    console.log(this.appeal);
    this.appealService.addAppeal(this.appeal);
    //this.campaignService.loadCampaigns();
  }
  ngOnInit() {
  }
}
