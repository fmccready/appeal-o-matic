import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { AppealInfo } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-info',
  templateUrl: 'appeal-info.component.html',
  styleUrls: ['appeal-info.component.css']
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  @Output() canceled = new EventEmitter<AppealInfo>();

  //private campaigns: Campaign[];
  private campaigns = new EventEmitter<Campaign[]>();
  private currentCampaign = new EventEmitter<Campaign>();

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService) {
    this.campaignService.getCampaigns().subscribe(
        data => {this.campaigns.next(data); console.log('next called on campaigns'); console.dir(data)},
        error => {console.log(error)}
      );
  }

  @Input()
  set appealInfo(appealInfo: AppealInfo){
    this.restoreService.setItem(appealInfo);
    this.currentCampaign.next(this.appealInfo.campaign);
    console.log('next called on current campaign');
    console.dir(this.appealInfo.campaign);
  }
  get appealInfo(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealInfo = this.restoreService.restoreItem();
    this.canceled.next(this.appealInfo);
  }

  ngOnInit() {
    this.currentCampaign.combineLatest(this.campaigns, function(current, campaigns){
      console.log('combine latest called');
      return current;
    }).subscribe(
      data => {
        this.appealInfo.campaign = data._id;
      }
    );
  }
}
