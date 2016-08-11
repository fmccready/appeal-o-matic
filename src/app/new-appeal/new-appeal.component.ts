import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { DatePipe } from '@angular/common';

import '../rxjs-operators';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { Campaign } from '../models/campaign';
import { Appeal } from '../models/appeal';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';
import { AppealListComponent } from '../appeal-list/appeal-list.component';


@Component({
  moduleId: module.id,
  selector: 'app-new-appeal',
  templateUrl: 'new-appeal.component.html',
  styleUrls: ['new-appeal.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, NKDatetime, AppealListComponent],
  pipes: [DatePipe],
  providers: [Appeal]
})
export class NewAppealComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  //appeal: Appeal;
  appealForm: FormGroup;

  name: FormControl = new FormControl("", Validators.required);
  campaign: FormControl = new FormControl("", Validators.required);
  sender: FormControl = new FormControl("");
  senderAddress: FormControl = new FormControl("");
  subjectLine: FormControl = new FormControl("");
  sendDate:Date = new Date();

  constructor(private campaignService: CampaignService, fb:FormBuilder, private appealService: AppealService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.appealForm = fb.group({
      "name": this.name,
      "campaign": this.campaign,
      "sender": this.sender,
      "senderAddress": this.senderAddress,
      "subjectLine": this.subjectLine,
      "sendDate": ['']
    });
  }
  convertToAppeal(formValues){
    var appeal = new Appeal();
    appeal.info = formValues;
    return appeal;
  }
  appealSubmit(formValues){
    if (this.appealForm.valid){
      var appeal = this.convertToAppeal(formValues);
      this.appealService.addAppeal(appeal);
      this.campaignService.loadCampaigns();
    }
  }
  ngOnInit() {
  }

}
