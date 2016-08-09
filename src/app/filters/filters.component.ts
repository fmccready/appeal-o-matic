import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  campaigns: Observable<Campaign[]>;
  selectedCampaign: AbstractControl;

  constructor(fb: FormBuilder, private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
    this.filtersForm = fb.group({
      'selectedCampaign': ['']
    });

    this.selectedCampaign = this.filtersForm.controls['selectedCampaign'];
  }

  onSubmit(value: string):void{
    console.log(value);
  }

  ngOnInit() {
  }

}
