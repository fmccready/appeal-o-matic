import { Component, OnInit } from '@angular/core';

import '../rxjs-operators';
import {TimepickerComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap-rc5/ng2-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-campaign',
  templateUrl: 'new-campaign.component.html',
  styleUrls: ['new-campaign.component.css'],
  directives: [TimepickerComponent, DATEPICKER_DIRECTIVES, CampaignListComponent],
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
