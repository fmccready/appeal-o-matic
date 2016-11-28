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
    if (_.isEqual(this.info, this._info)){
      this.changed = false;
    }
    else {
      this.changed = true
      if (this.info){
      console.log(this.info.sendDate);
      console.log(this._info.sendDate);
      }
    };
  }

  setCampaign(val){
    this.currentCampaignId.next(val);
  }

  @Input()
  set info(data: AppealInfo) {
    console.log(data.sendDate);
    for (var i = 0; i < this._campaigns.length; i++){
      if (data.campaign._id === this._campaigns[i]._id){
        data.campaign = Object.assign({}, this._campaigns[i]);
      }
    }
    this._info = data;
    this.setCampaign(data.campaign._id);
    this.restoreService.setItem(data);
    this.templates = this._info.campaign.templates;
    this.checkChanged();
  }
  get info(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
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
