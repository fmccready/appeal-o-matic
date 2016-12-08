import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

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
  private sendTime: Date = new Date();
  private templates: Array<Template>;
  private _info: AppealInfo = new AppealInfo();
  private currentCampaignId: BehaviorSubject<Campaign> = new BehaviorSubject(this._info.campaign._id);
  private ccSubscription: Subscription;

  private changed = false;

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.campaigns.subscribe(data => {
      this._campaigns = data;
      this.ccSubscription = this.currentCampaignId.subscribe(currId => {
        for (var i = 0; i < this._campaigns.length; i++){
          if (currId === this._campaigns[i]._id){
            this._info.campaign = Object.assign({}, this._campaigns[i]);
            this.templates = this._info.campaign.templates;
          }
        }
      });
    });
  }

  checkChanged(){
    this.changed = this.restoreService.isChanged();
    console.log('changed: ' + this.changed);
    /*
    if (_.isEqual(this.info, this._info)){
      this.changed = false;
    }
    else {
      this.changed = true;
    };
    */
  }

  setCampaign(val){
    this.currentCampaignId.next(val);
  }

  @Input()
  set info(data: AppealInfo) {
    data.sendDate = new Date(data.sendDate);
    this.sendTime = data.sendDate;
    for (var i = 0; i < this._campaigns.length; i++){
      if (data.campaign._id === this._campaigns[i]._id){
        data.campaign = Object.assign({}, this._campaigns[i]);
      }
    }
    this.setCampaign(data.campaign._id);
    this.restoreService.setItem(data);
    this._info = this.restoreService.getItem();
    this.templates = this._info.campaign.templates;
    this.checkChanged();
  }
  get info(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
    this._info.sendDate.setMinutes(this.sendTime.getMinutes());
    this._info.sendDate.setHours(this.sendTime.getHours());
    for (var i = 0; i < this._campaigns.length; i++){
      if (this._info.campaign._id === this._campaigns[i]._id){
        this._info.campaign = Object.assign({}, this._campaigns[i]);
      }
    }
    this.restoreService.setItem(this._info);
    this.saved.emit(this._info);
    this.checkChanged();
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
