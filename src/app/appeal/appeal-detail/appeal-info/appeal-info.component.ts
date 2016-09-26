import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { AppealService } from '../../../appeal.service';
import { AppealInfo } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-info',
  templateUrl: 'appeal-info.component.html',
  styleUrls: ['appeal-info.component.css']
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  private campaigns: Observable<Campaign[]>;

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns = campaignService.getCampaigns();
  }

  @Input()
  set info(appealInfo: AppealInfo) {
    this.restoreService.setItem(appealInfo);
  }
  get info(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
