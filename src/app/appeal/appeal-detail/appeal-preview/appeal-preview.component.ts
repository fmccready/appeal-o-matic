import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealContent, AppealCode, Appeal } from '../../../models/appeal';
import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';

declare var $:any;

interface JQuery {
    chosen(options?:any):JQuery;
}

@Component({
  selector: 'app-appeal-preview',
  templateUrl: 'appeal-preview.component.html',
  styleUrls: ['appeal-preview.component.css']
})
export class AppealPreviewComponent implements OnInit {
  preview: any;
  appeal:Appeal = new Appeal();
  campaign: Campaign;
  private linkCount: number;
  private utm_content: any;
  appealSubject:BehaviorSubject<Appeal>;
  constructor(private campaignService: CampaignService) {
  }

  @ViewChild('appealBody') appealBody: ElementRef;
  @ViewChild('appealPS') appealPS: ElementRef;
  generateBody(content){
    this.linkCount = 2;
    var self = this;
    if (content){
      if (this.appeal.info.campaign){
        this.campaignService.getCampaign(this.appeal.info.campaign).subscribe(
          data => {
            this.campaign = data.json();

            if (typeof content.body == 'string'){
              this.appealBody.nativeElement.innerHTML = this.replaceAll(content.body, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
              $(this.appealBody.nativeElement)
                .find('a').each(function(){
                  var url = $(this).attr('href');
                  url = self.addCodes(url);
                  $(this).attr('href', url);
                });
            }

            if (typeof content.ps == 'string'){
              this.appealPS.nativeElement.innerHTML = this.replaceAll(content.ps, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
              $(this.appealPS.nativeElement)
                .find('a').each(function(){
                  var url = $(this).attr('href');
                  url = self.addCodes(url);
                  $(this).attr('href', url);
                });
            }
          },
          error => console.log(error)
        );
      }

    }
  }

  addCodes(url){
    var hasQuestionMark = url.search('\\?');
    if (hasQuestionMark < 0){
      url += '?';
    }
    var version = {src: '', utm: this.campaign.utm_campaign + '-' + this.appeal.codes.series};

    if (this.appeal.codes.resend > 1){
      version.utm += '-rs'
    }
    else {
      version.utm += '-reg'
    }

    if (this.appeal.codes.audience == 'sustainer'){
      version.src = '_S';
      version.utm += '-sus';
    }
    else if (this.appeal.codes.audience == 'donor'){
      version.utm += '-d';
    }
    else if (this.appeal.codes.audience == 'nonDonor'){
      version.utm += '-nd';
    }
    else if (this.appeal.codes.audience == 'middleDonor') {
      version.utm += '-md';
    }


    url += '&s_src=EM' + (this.appeal.codes.resend || '1') + "TL" + this.linkCount + version.src;
    url = this.addStaticCodes(url);
    url += '&utm_content=' + version.utm;
    url += '&autologin=true';
    this.linkCount++;
    return url;
  }

  addStaticCodes(url){
    url += '&s_subsrc=' + this.appeal.codes.s_subsrc;
    url += '&utm_medium=' + this.appeal.codes.utm_medium;
    url += '&utm_source=' + this.appeal.codes.utm_source;
    url += '&utm_campaign=' + this.campaign.utm_campaign;
    return url;
  }

  @Input()
  set appealData(appealSub: BehaviorSubject<Appeal>){
    this.appealSubject = appealSub;
    appealSub.subscribe(
      data => {
        this.appeal = data;
        if (this.appeal.hasOwnProperty('_id')){
          this.generateBody(this.appeal.emailContent);
        }
      },
      error => console.log(error)
    )

  }
  get appealData(): BehaviorSubject<Appeal> {
    return this.appealSubject;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }


}
