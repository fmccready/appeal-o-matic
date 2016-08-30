import { Component, OnInit } from '@angular/core';

import 'rxjs/Rx';
import * as moment from 'moment';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-new-campaign',
  templateUrl: 'new-campaign.component.html',
  styleUrls: ['new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit {
  campaign: Campaign = new Campaign();
  startTime: Date = new Date();

  constructor(public campaignService:CampaignService) {
    this.campaign.startDate = new Date();
  }

  createCampaign() {
    var mins = this.startTime.getMinutes();
    var hours = this.startTime.getHours();
    this.campaign.startDate.setMinutes(mins);
    this.campaign.startDate.setHours(hours);
    this.campaignService.addCampaign(this.campaign);
    this.campaign = new Campaign();
    this.campaign.startDate = new Date();
  }

  ngOnInit() {

  }
}
