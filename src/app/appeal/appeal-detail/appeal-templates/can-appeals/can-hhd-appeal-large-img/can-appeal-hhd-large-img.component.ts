import { Component, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

import { AppealContent, AppealCode, Appeal } from '../../../../../models/appeal';
import { Campaign } from '../../../../../models/campaign';
import { CampaignService } from '../../../../../campaign.service';
import { PreviewService } from '../../../../../preview.service';

import { PlainTextPipe } from '../../../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../../../remove-html.pipe';

declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

@Component({
  selector: 'app-can-hhd-large-img-appeal',
  templateUrl: 'can-appeal-hhd-large-img.component.html',
  styleUrls: ['can-appeal-hhd-large-img.component.css']
})
export class CANHHDLargeAppealComponent implements OnChanges {
  preview: any;
  private version: any = {};
  private appeal: Appeal;
  private _appealSub$;
  private body;
  private template = new TemplateCodes();

  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this._appealSub$ = this.appealService.currentAppeal$;
    this._appealSub$.subscribe(data => {
      if (data){
        this.appeal = data;
        this.body = this.template.generateBody(this.appeal);
        console.log(this.body);
      }
    });
  }

  @ViewChild('htmlVersion') htmlVersion: ElementRef;
  @ViewChild('plainVersion') plainVersion: ElementRef;
  


  ngOnInit(){

    
  }
  ngOnDestory(){
    if (this._appealSub$){
      this._appealSub$.unsubscribe();
    }
  };


}
