import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { AppealService } from '../../../appeal.service';
import { AppealInfo } from '../../../models/appeal';

import { PreviewService, Template } from '../../../preview.service';
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
  private campaigns: Observable<Campaign[]>;
  private _campaigns: Campaign[];
  private templates: Array<Template>;
  private _info: AppealInfo = new AppealInfo();
  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.campaigns.subscribe(data => {
      this._campaigns = data;
    });
  }

  @Input()
  set info(data: AppealInfo) {
    this._info = data;
    this.restoreService.setItem(data);
    this.templates = this.info.campaign.templates;
  }
  get info(): AppealInfo {
    return this._info;
  }
  save() {
    for (var i = 0; i < this._campaigns.length; i++){
      if (this.info.campaign._id === this._campaigns[i]._id){
        this.info.campaign = this._campaigns[i];
      }
    }
    this.restoreService.setItem(this._info);
    this.saved.emit(this._info);
  }
  cancel() {
    this._info = this.restoreService.restoreItem();
    this.canceled.emit(this._info);
  }

  @ViewChild('campaign') campaign:ElementRef;

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', container: 'app-root', html: true});
    });
  }
}
