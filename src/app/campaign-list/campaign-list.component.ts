import { Component, OnInit, Pipe } from '@angular/core';
import { CampaignService } from '../campaign.service';
import 'rxjs/Rx';
import { Campaign } from '../models/campaign';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'campaign-list-component',
  templateUrl: 'campaign-list.component.html',
  styleUrls: ['campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[];
  constructor(private campaignService: CampaignService) {

  }

  getCampaigns(){
    this.campaignService.getCampaigns().subscribe(
      data => { this.campaigns = data },
      error => { console.log(error) }
    );
  }

  deleteCampaign(id) {
    this.campaignService.removeCampaign(id).subscribe(
      success => {
        console.log(success);
        this.campaignService.loadCampaigns();
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getCampaigns();
  }
}
