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
  constructor(public campaignService:CampaignService) {

  }

  createCampaign() {
    this.campaignService.addCampaign(this.campaign);
  }


  ngOnInit() {

  }
}
