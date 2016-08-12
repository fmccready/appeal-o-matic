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
import { AppealListComponent } from '../appeal-list/appeal-list.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, AppealListComponent]
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  campaigns: Observable<Campaign[]>;
  campaign: AbstractControl;
  filterList: BehaviorSubject<Object> = new BehaviorSubject({});
  constructor(fb: FormBuilder, private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
    this.filtersForm = fb.group({
      'campaign': ['']
    });
    this.campaign = this.filtersForm.controls['campaign'];
  }

  onSubmit(filters):void{
    this.filterList.next(filters);
  }

  ngOnInit() {
  }

}
