import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import '../rxjs-operators';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { CampaignListComponent } from '../campaign-list/campaign-list.component';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign.service';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-new-campaign',
  templateUrl: 'new-campaign.component.html',
  styleUrls: ['new-campaign.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, NKDatetime, CampaignListComponent],
  pipes: [DatePipe],
  providers: [Campaign]
})
export class NewCampaignComponent implements OnInit {
  newCampaignForm: FormGroup;
  name: AbstractControl;
  utm_campaign: AbstractControl;
  startDate: AbstractControl;
  constructor(fb: FormBuilder, public campaignService:CampaignService) {
    this.newCampaignForm = fb.group({
      'name': ['', Validators.required],
      'utm_campaign': ['', Validators.required],
      'startDate': ['', Validators.required]
    });
  }

  createCampaign(campaign) {
    if (this.newCampaignForm.valid){
      this.campaignService.addCampaign(campaign).subscribe(
        data => {
          console.log('success');
          console.dir(data);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('createCampaign complete');
        }
      );
      this.resetForm();
      this.campaignService.loadCampaigns();
    }
  }

  resetForm(){
    var fb = new FormBuilder;
    this.newCampaignForm = fb.group({
      'name': ['', Validators.required],
      'utm_campaign': ['', Validators.required],
      'startDate': ['', Validators.required]
    });
    this.name = this.newCampaignForm.controls['name'];
    this.utm_campaign = this.newCampaignForm.controls['utm_campaign'];
    this.startDate = this.newCampaignForm.controls['startDate'];
  }

  ngOnInit() {
    this.name = this.newCampaignForm.controls['name'];
    this.utm_campaign = this.newCampaignForm.controls['utm_campaign'];
    this.startDate = this.newCampaignForm.controls['startDate'];
  }
}
