import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign';
import { AppealListComponent } from '../appeal-list/appeal-list.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css'],
  directives: [AppealListComponent]
})
export class FiltersComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  filters: any = {};
  filterList: BehaviorSubject<Object> = new BehaviorSubject({});
  constructor(private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
  }

  onSubmit(filters):void{
    this.filterList.next(filters);
  }

  ngOnInit() {
  }

}
