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
  providers: [AppealInfo, RestoreService]
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  @Output() canceled = new EventEmitter<AppealInfo>();
  private campaigns: Campaign[];
  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService) {
    this.campaignService.getCampaigns().subscribe(
        data => {this.campaigns = data},
        error => {console.log(error)}
      );
    }

  @Input()
  set appealInfo(appealInfo: AppealInfo){
    this.restoreService.setItem(appealInfo);
  }
  get appealInfo(): AppealInfo {
    return this.restoreService.getItem();
  }
  save() {
    var appeal = this.restoreService.getItem();
    appeal.campaign = appeal.campaign._id;
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealInfo = this.restoreService.restoreItem();
    this.canceled.next(this.appealInfo);
  }

  ngOnInit() {
  }

}
