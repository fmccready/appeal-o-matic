import { Component, OnInit } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  filters: any = {};
  filterList: Subject<Object>;
  constructor(private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
    this.filterList = new Subject(this.filters);
  }

  onSubmit(filters): void {
    this.filterList.next(filters);
  }

  ngOnInit() {
  }

}
