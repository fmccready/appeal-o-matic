import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealContent, AppealCode, Appeal } from '../../../models/appeal';
import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';

import { PlainTextPipe } from '../../../plain-text.pipe';

declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

@Component({
  selector: 'app-appeal-preview',
  templateUrl: 'appeal-preview.component.html',
  styleUrls: ['appeal-preview.component.css']
})
export class AppealPreviewComponent implements OnInit {
  preview: any;
  private linkCount: any = {};
  private textLinkCount: any = {};
  private version: any = {};
  private appeal: any;
  appealSubject: BehaviorSubject<Appeal>;
  constructor(private campaignService: CampaignService) {
    this.linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
  }

  @ViewChild('appealBody') appealBody: ElementRef;
  @ViewChild('appealPS') appealPS: ElementRef;
  @ViewChild('plainBody') plainBody: ElementRef;
  @ViewChild('plainPS') plainPS: ElementRef;
  generateBody(content) {
    var self = this;
    if (content) {
      if (this.appeal.info.campaign) {
        this.setVersion();
        if (content.hasOwnProperty('body')) {
          this.appealBody.nativeElement.innerHTML = content.body;
          this.plainBody.nativeElement.innerHTML = content.body;
          //this.appealBody.nativeElement.innerHTML = this.replaceAll(content.body, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
          $(this.appealBody.nativeElement)
            .find('a').each(function() {
              var url = $(this).attr('href');
              self.addCodes(url, 'TL', 'html').subscribe(data => url = data);
              $(this).attr('href', url);
              $(this).css({
                'color': '#00529c',
                'textDecoration': 'none',
                'fontWeight': 'bold'
              });
            });
          $(this.plainBody.nativeElement)
            .find('a').each(function() {
              var url = $(this).attr('href');
              self.addCodes(url, 'TL', 'plain').subscribe(data => url = data);
              $(this).attr('href', url);
            });
          this.plainBody.nativeElement.innerHTML = new PlainTextPipe().transform(this.plainBody.nativeElement.innerHTML);
        }

        if (content.hasOwnProperty('ps')) {
          this.appealPS.nativeElement.innerHTML = content.ps;
          this.plainPS.nativeElement.innerHTML = content.ps;
          //this.appealPS.nativeElement.innerHTML = this.replaceAll(content.ps, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
          $(this.appealPS.nativeElement)
            .find('a').each(function() {
              var url = $(this).attr('href');
              self.addCodes(url, 'TL', 'html').subscribe(data => url = data);
              $(this).attr('href', url);
              $(this).css({
                'color': '#00529c',
                'textDecoration': 'none',
                'fontWeight': 'bold'
              });
            });
          $(this.plainPS.nativeElement)
            .find('a').each(function() {
              var url = $(this).attr('href');
              self.addCodes(url, 'TL', 'plain').subscribe(data => url = data);
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
    this.version = { src: '', utm: (this.appeal.info.campaign.utm_campaign || '') + '-' + (this.appeal.codes.series || '1') };
    if (this.appeal.codes.resend > 1) {
      this.version.utm += '-rs'
    }
    else {
      this.version.utm += '-reg'
    }

    if (this.appeal.codes.audience == 'sustainer') {
      this.version.src = '_S';
      this.version.utm += '-sus';
    }
    else if (this.appeal.codes.audience == 'donor') {
      this.version.src = '';
      this.version.utm += '-d';
    }
    else if (this.appeal.codes.audience == 'nonDonor') {
      this.version.src = '';
      this.version.utm += '-nd';
    }
    else if (this.appeal.codes.audience == 'middleDonor') {
      this.version.src = '';
      this.version.utm += '-md';
    }
    else {
      this.version.src = '';
    }
  }
  addUtmOnly(url: string, utmContent: string, emailType: string): Observable<string> {
    if (url && this.appeal.hasOwnProperty('_id')) {
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0) {
        url += '?';
      }
      url += '&utm_medium=' + (this.appeal.codes.utm_medium || '');
      url += '&utm_source=' + (this.appeal.codes.utm_source || '');
      url += '&utm_campaign=' + (this.appeal.info.campaign.utm_campaign || '');
      url += '&autologin=true';
      url += '&utm_content=' + (this.version.utm || '') + '-' + (emailType || '') + '-' + (utmContent || '');
      return Observable.of(url);
    }
    else {
      return Observable.of('URL not set');
    }
  }
  addCodes(url: string, linkType: any, emailType: string): Observable<string> {
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
      return Observable.of(url);
    }
    else {
      return Observable.of('loading or URL not set');
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
    url += '&utm_campaign=' + (this.appeal.info.campaign.utm_campaign || '');
    url += '&autologin=true';
    return url;
  }

  @Input()
  set appealData(appealSub: BehaviorSubject<Appeal>) {
    this.appealSubject = appealSub;
    appealSub.subscribe(
      data => {
        this.appeal = data;
        if (this.appeal.hasOwnProperty('_id')) {
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

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
}
