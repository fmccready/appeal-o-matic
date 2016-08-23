import { Component, OnInit, Pipe, Input } from '@angular/core';
import { AppealService } from '../appeal.service';
import { CampaignService } from '../campaign.service';
import 'rxjs/Rx';
import { Appeal } from '../models/appeal';
import { Campaign } from '../models/campaign';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css'],
  inputs: ['filters']
})
export class AppealListComponent implements OnInit {
  appeals: Appeal[];
  private campaigns: Campaign[];
  public filters: Observable<Object>;
  constructor(private appealService: AppealService, private campaignService: CampaignService, private route: ActivatedRoute) {
    appealService.loadAppeals();
  }
  getAppeals(){
    this.appealService.getAppeals().subscribe(
      data => { this.appeals = data; },
      error => { console.log(error) }
    );
    /*
    this.campaignService.getCampaigns().subscribe(
      data => this.campaigns = data,
      error => console.log(error)
    );
    */
  }

  deleteAppeal(id) {
    this.appealService.removeAppeal(id).subscribe(
      success => {
        console.log(success);
        this.appealService.loadAppeals();
      },
      error => { console.log(error) }
    );
  }

  ngOnInit() {
    this.getAppeals();
    if (this.filters){
      this.filters.subscribe(
        data => { this.appealService.filterAppeals(data) },
        error => { console.log(error) },
        () => { console.log('filters complete') }
      );
    }
  }
}
