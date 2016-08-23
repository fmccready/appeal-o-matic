import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import '../rxjs-operators';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import {TimepickerComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap-rc5/ng2-bootstrap';

import { Campaign } from '../models/campaign';
import { Appeal } from '../models/appeal';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';
import { AppealListComponent } from '../appeal-list/appeal-list.component';


@Component({
  selector: 'app-new-appeal',
  templateUrl: 'new-appeal.component.html',
  styleUrls: ['new-appeal.component.css'],
  directives: [TimepickerComponent, DATEPICKER_DIRECTIVES, AppealListComponent],
  pipes: [DatePipe],
  providers: [Appeal]
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
    console.dir(this.appeal);
  }

}
