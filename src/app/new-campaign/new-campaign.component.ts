import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';

@Component({
  moduleId: module.id,
  selector: 'app-new-campaign',
  templateUrl: 'new-campaign.component.html',
  styleUrls: ['new-campaign.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, NKDatetime ],
  pipes: [DatePipe]
})
export class NewCampaignComponent implements OnInit {
  newCampaignForm: FormGroup;
  name: AbstractControl;
  utm_campaign: AbstractControl;
  startDate: AbstractControl;
  constructor(fb: FormBuilder) {
    this.newCampaignForm = fb.group({
      'name': ['', Validators.required],
      'utm_campaign': ['', Validators.required],
      'startDate': ['', Validators.required]
    });

    this.name = this.newCampaignForm.controls['name'];
    this.utm_campaign = this.newCampaignForm.controls['utm_campaign'];
    this.startDate = this.newCampaignForm.controls['startDate'];
  }
  onSubmit(value) {
    console.log(value);
    console.dir(value);
  }
  ngOnInit() {
  }
}
