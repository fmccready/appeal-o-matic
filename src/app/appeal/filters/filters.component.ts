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
      let sendDate = new Date(appeal.info.sendDate);
      if (filters.startDate && filters.endDate){
        filters.endDate.setHours(23, 59, 59, 999);
        if(sendDate.getTime() < filters.startDate.getTime() || sendDate.getTime() > filters.endDate.getTime()){
          match = false;
        }
      }
      else if (filters.startDate && !filters.endDate){
        if(sendDate.getTime() < filters.startDate.getTime()){
          match = false;
        }
      }
      else if (!filters.startDate && filters.endDate){
        filters.endDate.setHours(23, 59, 59, 999);
        if (sendDate.getTime() > filters.endDate.getTime()){
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
      this.appealSub = this.appealService.getAppeals();
      this.appealSub.flatMap(data => {return data}).filter(function(obj, index, obs){
        if (obj){
          return !obj.info.scheduled;
        }
        else {
          return false;
        }
      }).subscribe(
        data => { this.appeals.push(data); }
      );
    }
  }

  ngOnDestroy(){
    if (this.filterSub){
      this.filterSub.unsubscribe();
    }
  }

}
