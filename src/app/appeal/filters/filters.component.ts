import { Component, OnInit } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

import { Appeal } from '../../models/appeal';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  appeals: Appeal[] = [];
  filters: Object = {};
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = campaignService.getCampaigns();
    this.appealService.getAppeals().subscribe(
      data => {this.appeals = data; console.log(this.appeals); }
    );
  }

  onSubmit(filters): void {
    this.appealService.filterAppeals(this.filters).subscribe(
      data => {this.appeals = data;}
    );
  }

  ngOnInit() {
  }

}
