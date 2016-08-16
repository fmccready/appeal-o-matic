import { Component, OnInit } from '@angular/core';

import '../rxjs-operators';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-campaign',
  templateUrl: 'app/new-campaign/new-campaign.component.html',
  styleUrls: ['app/new-campaign/new-campaign.component.css'],
  directives: [NKDatetime, CampaignListComponent],
  pipes: [DatePipe],
  providers: [Campaign]
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
