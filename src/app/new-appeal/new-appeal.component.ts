import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import '../rxjs-operators';

import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { Campaign } from '../models/campaign';
import { Eappeal } from '../models/eappeal';
import { CampaignService } from '../campaign.service';

@Component({
  moduleId: module.id,
  selector: 'app-new-appeal',
  templateUrl: 'new-appeal.component.html',
  styleUrls: ['new-appeal.component.css']
})
export class NewAppealComponent implements OnInit {
  campaigns: Campaign[];
  model = new Eappeal();
  constructor() { }

  ngOnInit() {
  }

}
