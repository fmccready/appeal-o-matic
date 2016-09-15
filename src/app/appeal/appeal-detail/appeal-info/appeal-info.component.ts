import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AsyncSubject, Observable } from 'rxjs/Rx';

import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { Appeal } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-info',
  templateUrl: 'appeal-info.component.html',
  styleUrls: ['appeal-info.component.css']
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<Appeal>();
  private currentCampaignId: Campaign;
  private campaigns: Observable<Campaign[]>;

  constructor(private restoreService: RestoreService<Appeal>, private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
  }

  @Input()
  set appeal(appeal: Appeal){
    this.restoreService.setItem(appeal);
    if (this.restoreService.getItem().info.campaign){
      this.currentCampaignId = this.restoreService.getItem().info.campaign._id;
    }
  }
  get appeal(): Appeal {
    return this.restoreService.getItem();
  }
  save() {
    console.log(this.restoreService.getItem());
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
