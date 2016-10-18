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
  selector: 'app-can-standard-appeal',
  templateUrl: 'can-appeal-standard.component.html',
  styleUrls: ['can-appeal-standard.component.css']
})
export class CANStandardAppealComponent implements OnChanges {
  preview: any;
  private linkCount: any = {};
  private textLinkCount: any = {};
  private version: any = {};
  private appeal: Appeal = new Appeal();
  constructor(private campaignService: CampaignService, private previewService: PreviewService) {
    this.linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.appeal.content = new AppealContent();
    this.appeal.codes = new AppealCode();
    this.appeal.content.image.code = '';
    this.appeal.content.image.url = '';
    this.appeal.content.image.utm = '';
  }

  copyHtml(){
    var temp = document.createElement('input');
    var hidden = document.querySelector('#hidden');
    hidden.appendChild(temp);

    temp.value = this.htmlVersion.nativeElement.innerHTML.toString();
    temp.value = temp.value.replace(/_ngcontent\S+"/g, '');
    temp.value = temp.value.replace(/ng-reflect-href\S+\s/g, '');
    temp.value = temp.value.replace(/ng-reflect-src\S+"/g, '');
    temp.value = temp.value.replace(/ng-reflect-inner-h-t-m-l="[[:word:][:blank:]]+"/g, '');
    temp.value = temp.value.replace(/&amp;/g, '&');
    temp.value = temp.value.replace(/–/g, '&ndash;');
    temp.select();
    try {
      let success = document.execCommand('copy');
    } catch (err) {
      console.log(err);
    }
    window.getSelection().removeAllRanges();
  }

  copyPlain(){
    var plainTemp = document.createElement('textarea');
    var hidden = document.querySelector('#hidden');
    hidden.appendChild(plainTemp);

    plainTemp.value = this.plainVersion.nativeElement.innerText;
    plainTemp.value = plainTemp.value.replace(/–/g, '-');
    plainTemp.select();
    try {
      let success = document.execCommand('copy');
    } catch(err){
      console.log(err);
    }
    window.getSelection().removeAllRanges();
  }

  @ViewChild('htmlVersion') htmlVersion: ElementRef;
  @ViewChild('plainVersion') plainVersion: ElementRef;
  @ViewChild('appealBody') appealBody: ElementRef;
  @ViewChild('appealPS') appealPS: ElementRef;
  @ViewChild('plainBody') plainBody: ElementRef;
  @ViewChild('plainHeadline') plainHeadline: ElementRef;
  @ViewChild('plainPS') plainPS: ElementRef;
  generateBody() {
    this.linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.version = {};

    var self = this;
    var content = this.appeal.content;
    if (content) {
      if (this.appeal.info.campaign) {
        this.setVersion();
        if (content.hasOwnProperty('body')) {
          this.appealBody.nativeElement.innerHTML = content.body;
          this.plainBody.nativeElement.innerHTML = content.body;
          this.plainHeadline.nativeElement.innerHTML = content.headline;
          $(this.appealBody.nativeElement)
            .find('a').each(function() {
              let url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'html');
              $(this).attr('href', url);
              $(this).css({
                'color': '#00529c',
                'textDecoration': 'none',
                'fontWeight': 'bold'
              });
            });
          $(this.plainBody.nativeElement)
            .find('a').each(function() {
              let url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'plain');
              $(this).attr('href', url);
            });
          this.plainBody.nativeElement.innerHTML = new PlainTextPipe().transform(this.plainBody.nativeElement.innerHTML);
        }

        if (content.hasOwnProperty('ps')) {
          this.appealPS.nativeElement.innerHTML = content.ps;
          this.plainPS.nativeElement.innerHTML = content.ps;
          $(this.appealPS.nativeElement)
            .find('a').each(function() {
              var url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'html');
              $(this).attr('href', url);
              $(this).css({
                'color': '#00529c',
                'textDecoration': 'none',
                'fontWeight': 'bold'
              });
            });
          $(this.plainPS.nativeElement)
            .find('a').each(function() {
              let url = $(this).attr('href');
              url = self.addCodes(url, 'TL', 'plain');
              $(this).attr('href', url);
            });
          this.plainPS.nativeElement.innerHTML = new PlainTextPipe().transform(this.plainPS.nativeElement.innerHTML);
        }
      }
    }
    this.linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
  }

  setVersion() {
    this.version = { src: '', utm: (this.appeal.info.campaign || '') + '-' + (this.appeal.codes.series || '1') };
    if (this.appeal.codes.resend > 1) {
      this.version.utm += '-rs';
    }

    if (this.appeal.codes.audience === 'sustainer') {
      this.version.src = '_S';
      this.version.utm += '-sus';
    }
    else if (this.appeal.codes.audience === 'donor') {
      this.version.src = '';
      this.version.utm += '-d';
    }
    else if (this.appeal.codes.audience === 'nonDonor') {
      this.version.src = '_N';
      this.version.utm += '-nd';
    }
    else if (this.appeal.codes.audience === 'middleDonor') {
      this.version.src = '';
      this.version.utm += '-md';
    }
    else {
      this.version.utm += '-reg';
    }
  }
  addUtmOnly(url: string, utmContent: string, emailType: string): string {
    if (url && this.appeal.hasOwnProperty('_id')) {
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0) {
        url += '?';
      }
      url += '&utm_medium=' + (this.appeal.codes.utm_medium || '');
      url += '&utm_source=' + (this.appeal.codes.utm_source || '');
      url += '&utm_campaign=' + (this.appeal.info.campaign || '');
      url += '&autologin=true';
      url += '&utm_content=' + (this.version.utm || '') + '-' + (emailType || '') + '-' + (utmContent || '');
      return url;
    }
    else {
      return 'URL not set';
    }
  }
  addCodes(url: string, linkType: any, emailType: string): string {
    if (url && this.appeal.hasOwnProperty('_id')) {
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0) {
        url += '?';
      }
      if (emailType === 'html') {
        if (linkType === 'TL') {
          linkType = { src: 'TL' + this.linkCount.textLink, utm: 'text-link-' + this.linkCount.textLink };
          this.linkCount.textLink++;
        }
        else if (linkType === 'FT') {
          linkType = { src: 'FT' + this.linkCount.footerLink, utm: 'footer-link-' + this.linkCount.footerLink };
          this.linkCount.footerLink++;
        }
        else if (linkType === 'PH') {
          linkType = { src: 'PH' + this.linkCount.photoLink, utm: 'photo-link-' + this.linkCount.photoLink };
          this.linkCount.photoLink++;
        }
        else if (linkType === 'VID') {
          linkType = { src: 'VID' + this.linkCount.videoLink, utm: 'video-link-' + this.linkCount.videoLink };
          this.linkCount.videoLink++;
        }
        else if (linkType === 'AUD') {
          linkType = { src: 'AUD' + this.linkCount.audioLink, utm: 'audio-link-' + this.linkCount.audioLink };
          this.linkCount.audioLink++;
        }
        else if (linkType === 'BN') {
          linkType = { src: 'BN' + this.linkCount.buttonLink, utm: 'button-link-' + this.linkCount.buttonLink };
          this.linkCount.buttonLink++;
        }
        url = this.addSource(url, linkType);
      }
      else if (emailType === 'plain') {
        if (linkType === 'TL') {
          linkType = { src: 'TL' + this.textLinkCount.textLink, utm: 'text-link-' + this.textLinkCount.textLink };
          this.textLinkCount.textLink++;
        }
        else if (linkType === 'FT') {
          linkType = { src: 'FT' + this.textLinkCount.footerLink, utm: 'footer-link-' + this.textLinkCount.footerLink };
          this.textLinkCount.footerLink++;
        }
        else if (linkType === 'PH') {
          linkType = { src: 'PH' + this.textLinkCount.photoLink, utm: 'photo-link-' + this.textLinkCount.photoLink };
          this.textLinkCount.photoLink++;
        }
        else if (linkType === 'VID') {
          linkType = { src: 'VID' + this.textLinkCount.videoLink, utm: 'video-link-' + this.textLinkCount.videoLink };
          this.textLinkCount.videoLink++;
        }
        else if (linkType === 'AUD') {
          linkType = { src: 'AUD' + this.textLinkCount.audioLink, utm: 'audio-link-' + this.textLinkCount.audioLink };
          this.textLinkCount.audioLink++;
        }
        else if (linkType === 'BN') {
          linkType = { src: 'BN' + this.textLinkCount.buttonLink, utm: 'button-link-' + this.textLinkCount.buttonLink };
          this.textLinkCount.buttonLink++;
        }
        url = this.addSource(url, linkType);
      }

      url = this.addStaticCodes(url);
      url += '&utm_content=' + (this.version.utm || '') + '-' + (emailType || '') + '-' + (linkType.utm || '');
      return url;
    }
    else {
      return 'loading or URL not set';
    }
  }

  addSource(url, linkType) {
    url += '&s_src=EM' + (this.appeal.codes.resend || '1') + linkType.src + this.version.src;
    return url;
  }

  addStaticCodes(url) {
    url += '&s_subsrc=' + (this.appeal.codes.s_subsrc || '');
    url += '&utm_medium=' + (this.appeal.codes.utm_medium || '');
    url += '&utm_source=' + (this.appeal.codes.utm_source || '');
    url += '&utm_campaign=' + (this.appeal.info.campaign || '');
    url += '&autologin=true';
    return url;
  }

  @Input()
  set appealPreview(appeal: Appeal) {
    this.appeal = appeal;
    this.generateBody();
  }
  get appealPreview(): Appeal {
    return this.appeal;
  }
  ngOnInit(){
    this.previewService.appeal.subscribe(data => {this.appeal = data;this.generateBody();});
  }
  ngOnChanges(changes) {
    this.appeal = changes.appealPreview.currentValue;
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
}
