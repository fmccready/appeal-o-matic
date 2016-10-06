import { Component, OnInit, OnDestroy } from '@angular/core';

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
  private campaigns: Observable<Campaign[]>;
  private appeals: Appeal[] = [];
  private filters: Object = {};
  private appealSub;
  private filterSub;
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = campaignService.getCampaigns();
    this.appealService.loadAppeals();
  }

  onSubmit(filters): void {
    event.preventDefault();
    this.appeals = [];
    this.filterSub = this.appealSub.flatMap(data => {console.log(data); return data;}).filter(function(appeal: Appeal, index: Number){
      let match = true;
      if (filters.campaign){
        if (appeal.info.campaign !== filters.campaign.utm){
          match = false;
        }
      }
      if (filters.scheduled){
        if (filters.scheduled === 'yes'){
          if(appeal.info.scheduled !== true){
            match = false;
          }
        }
        else if (filters.scheduled === 'no'){
          if(appeal.info.scheduled !== false){
            match = false;
          }
        }
      }
      if (filters.startDate && filters.endDate){
        console.log(filters);
        console.log(appeal.info.sendDate);
        console.log(typeof appeal.info.sendDate);
        if(appeal.info.sendDate < filters.startDate.getTime() && appeal.info.sendDate > filters.endDate.getTime()){
          console.log('not a match');
          match = false;
        }
      }
      return match;
    }).subscribe(
      data => {this.appeals.push(data);}
    );
  }

  ngOnInit() {
    if (!this.appealSub){
      console.log('subscribing');
      this.appealSub = this.appealService.getAppeals();
      this.appealSub.subscribe(
        data => { this.appeals = data; }
      );
    }
  }

  ngOnDestroy(){
  }

}
