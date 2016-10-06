import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Appeal, AppealInfo } from '../../models/appeal';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

import { PreviewService, Template } from '../../preview.service';


@Component({
  selector: 'app-new-appeal',
  templateUrl: 'new-appeal.component.html',
  styleUrls: ['new-appeal.component.css'],
})
export class NewAppealComponent implements OnInit {
  private campaigns: Observable<Campaign[]>;
  private appeal: Appeal = new Appeal();
  private info: AppealInfo = new AppealInfo();
  private sendTime: Date = new Date();
  private appeals: Appeal[];
  private templates: Array<Template>;
  private appealSub;
  constructor(private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService) {
    this.appealService.loadAppeals();
    this.templates = previewService.templates;
  }
  
  appealSubmit(){
    var mins = this.sendTime.getMinutes();
    var hours = this.sendTime.getHours();
    if (this.info.hasOwnProperty('sendDate')){
      this.info.sendDate.setMinutes(mins);
      this.info.sendDate.setHours(hours);
    }
    this.appeal.info = this.info;
    this.appealService.addAppeal(this.appeal);
  }
  ngOnInit() {
    this.campaigns = this.campaignService.getCampaigns();
    this.appealSub = this.appealService.getAppeals().subscribe(
      data => {this.appeals = data; console.log(data);}
    )
  }
  ngOnDestroy(){
    this.appealSub.unsubscribe();
  }
}
