import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../campaign.service';
//import '../rxjs-operators';
import 'rxjs/Rx';
import {Campaign} from '../campaign';
import { Observable } from 'rxjs/Observable';
@Component({
  moduleId: module.id,
  selector: 'campaign-list-component',
  templateUrl: 'campaign-list.component.html',
  styleUrls: ['campaign-list.component.css'],
  providers: [CampaignService, Campaign]
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[];
  errors: any;
  constructor(private campaignService: CampaignService) {
  }
  getCampaigns() {
    this.campaignService.getCampaigns()
      .subscribe(
        campaigns => this.campaigns = campaigns,
        error => this.errors = <any>error);
  }
  ngOnInit() {
    this.getCampaigns();
  }

}
