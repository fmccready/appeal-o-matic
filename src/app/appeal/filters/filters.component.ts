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
      data => { this.appeals = data; }
    );
  }

  onSubmit(filters): void {
    this.appealService.getAppeals().flatMap(data => {return data;}).filter(function(appeal: Appeal, index: Number){
      if (filters.campaign){
        if (appeal.info.campaign === filters.campaign){
          console.log('returning true because campaign matches');
          return true;
        }
      }
      if (filters.scheduled){
        if (filters.scheduled === 'yes'){
          if(appeal.info.scheduled === true){
            return true;
          }
        }
        if (filters.scheduled === 'no'){
          if(appeal.info.scheduled === false){
            return true;
          }
        }
      }
    });
    /*
    this.appealService.filterAppeals(this.filters).subscribe(
      data => {this.appeals = data;}
    );
    */
  }

  ngOnInit() {
  }

}
