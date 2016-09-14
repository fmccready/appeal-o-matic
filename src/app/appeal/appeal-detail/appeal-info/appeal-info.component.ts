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
  private _appeal: Appeal;

  constructor(private restoreService: RestoreService<Appeal>, private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
  }

  @Input()
  set appeal(appeal: Appeal){
    this.restoreService.setItem(appeal);
    this._appeal = appeal;
    if (this._appeal.info.campaign){
      this.currentCampaignId = this._appeal.info.campaign._id;
    }
  }
  get appeal(): Appeal {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this._appeal = this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
