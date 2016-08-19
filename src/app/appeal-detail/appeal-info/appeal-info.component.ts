import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { AppealInfo } from '../../models/appeal';
import { RestoreService } from '../../restore.service';
import { CampaignService } from '../../campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  moduleId: module.id,
  selector: 'app-appeal-info',
  templateUrl: 'appeal-info.component.html',
  styleUrls: ['appeal-info.component.css'],
  directives: [NKDatetime],
  providers: [AppealInfo, RestoreService, CampaignService]
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  @Output() canceled = new EventEmitter<AppealInfo>();

  //private campaigns: Campaign[];
  private campaigns = new EventEmitter<Campaign[]>();
  private currentCampaign = new EventEmitter<Campaign>();

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService) {
    this.campaignService.getCampaigns().subscribe(
        data => {this.campaigns.next(data)},
        error => {console.log(error)}
      );
  }

  @Input()
  set appealInfo(appealInfo: AppealInfo){
    this.restoreService.setItem(appealInfo);
    this.currentCampaign.next(this.appealInfo.campaign);
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
      return current;
    }).first().subscribe(
      data => {
        this.appealInfo.campaign = data._id;
      }
    );

  }
}
