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

  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = this.campaignService.getCampaigns();
  }
  appealSubmit(){
    this.appealService.addAppeal(this.appeal);
    this.campaignService.loadCampaigns();
  }
  ngOnInit() {
  }

}
