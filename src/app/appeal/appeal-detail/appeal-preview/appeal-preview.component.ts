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
  private linkCount:any = {};
  private version:any = {};
  appealSubject:BehaviorSubject<Appeal>;
  constructor(private campaignService: CampaignService) {
  }

  @ViewChild('appealBody') appealBody: ElementRef;
  @ViewChild('appealPS') appealPS: ElementRef;
  generateBody(content){
    this.linkCount = {buttonLink: 1, textLink: 1, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1};
    var self = this;
    if (content){
      if (this.appeal.info.campaign){
        this.setVersion();
        if (typeof content.body == 'string'){
          this.appealBody.nativeElement.innerHTML = this.replaceAll(content.body, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
          $(this.appealBody.nativeElement)
            .find('a').each(function(){
              var url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'html');
              $(this).attr('href', url);
            });
        }

        if (typeof content.ps == 'string'){
          this.appealPS.nativeElement.innerHTML = this.replaceAll(content.ps, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
          $(this.appealPS.nativeElement)
            .find('a').each(function(){
              var url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'html');
              $(this).attr('href', url);
            });
        }
      }
    }
  }

  setVersion(){
    this.version = {src: '', utm: this.appeal.info.campaign.utm_campaign + '-' + this.appeal.codes.series};
    if (this.appeal.codes.resend > 1){
      this.version.utm += '-rs'
    }
    else {
      this.version.utm += '-reg'
    }

    if (this.appeal.codes.audience == 'sustainer'){
      this.version.src = '_S';
      this.version.utm += '-sus';
    }
    else if (this.appeal.codes.audience == 'donor'){
      this.version.utm += '-d';
    }
    else if (this.appeal.codes.audience == 'nonDonor'){
      this.version.utm += '-nd';
    }
    else if (this.appeal.codes.audience == 'middleDonor') {
      this.version.utm += '-md';
    }
  }

  addCodes(url: string, linkType: any, emailType: string): string{
    if (url){
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0){
        url += '?';
      }
    }

    if (linkType === 'TL'){
      linkType = {src: 'TL' + this.linkCount.textLink, utm: '-text-link-' + this.linkCount.textLink};
      this.linkCount.textLink++;
    }
    else if (linkType === 'PH') {
      linkType = {src: 'PH' + this.linkCount.photoLink, utm: '-photo-link-' + this.linkCount.photoLink};
      this.linkCount.photoLink++;
    }
    else if (linkType === 'VID') {
      linkType = {src: 'VID' + this.linkCount.videoLink, utm: '-video-link-' + this.linkCount.videoLink}
      this.linkCount.videoLink++;
    }
    else if (linkType === 'AUD') {
      linkType = {src: 'AUD' + this.linkCount.audioLink, utm: '-audio-link-' + this.linkCount.audioLink}
      this.linkCount.audioLink++;
    }
    else if (linkType === 'BN') {
      linkType = {src: 'BN' + this.linkCount.buttonLink, utm: '-button-link-' + this.linkCount.buttonLink}
      this.linkCount.buttonLink++;
    }

    url = this.addSource(url, linkType);

    url = this.addStaticCodes(url);
    url += '&utm_content=' + this.version.utm + '-' + emailType + linkType.utm;
    return url;
  }
  addSource(url, linkType){
    url += '&s_src=EM' + (this.appeal.codes.resend || '1') + linkType.src + this.version.src;
    return url;
  }
  addStaticCodes(url){
    url += '&s_subsrc=' + this.appeal.codes.s_subsrc;
    url += '&utm_medium=' + this.appeal.codes.utm_medium;
    url += '&utm_source=' + this.appeal.codes.utm_source;
    //url += '&utm_campaign=' + this.appeal.info.campaign.utm_campaign;
    url += '&autologin=true';
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
    );
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
