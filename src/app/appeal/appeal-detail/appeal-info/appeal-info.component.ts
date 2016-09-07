import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AsyncSubject, Observer, Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { AppealInfo } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-info',
  templateUrl: 'appeal-info.component.html',
  styleUrls: ['appeal-info.component.css'],
  providers: [RestoreService]
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  @Output() canceled = new EventEmitter<AppealInfo>();
  private currentCampaignId: Campaign;
  private campaigns: Observable<Campaign[]>;

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService) {
    this.campaigns = campaignService.getCampaigns();
  }

  @Input()
  set appealInfo(appealInfo: AppealInfo){
    this.restoreService.setItem(appealInfo);
    if (appealInfo.campaign){
      this.currentCampaignId = (appealInfo.campaign._id);
    }
  }
  get appealInfo(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
    var data = this.restoreService.getItem();
    data.campaign = this.currentCampaignId;
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealInfo = this.restoreService.restoreItem();
    this.canceled.next(this.appealInfo);
  }

  ngOnInit() {
  }
}
