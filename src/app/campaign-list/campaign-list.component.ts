import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../campaign.service';
import '../rxjs-operators';
import {Campaign} from '../campaign';
import { Observable } from 'rxjs/Observable';
@Component({
  moduleId: module.id,
  selector: 'app-campaign-list',
  templateUrl: 'campaign-list.component.html',
  styleUrls: ['campaign-list.component.css'],
  providers: [CampaignService, Campaign]
})
export class CampaignListComponent implements OnInit {
  campaigns: any;
  constructor() {
    this.campaigns = CampaignService.loadCampaigns();
  }
  ngOnInit() {
  }

}
