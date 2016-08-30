import { Component, OnInit, Input } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealContent, AppealCode } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-preview',
  templateUrl: 'appeal-preview.component.html',
  styleUrls: ['appeal-preview.component.css']
})
export class AppealPreviewComponent implements OnInit {
  preview: any;
  appeal:any = {};
  constructor() {
  }
  @Input()
  set appealContent(appealContent: AppealContent){
    this.appeal.content = appealContent || 'Loading...';
    if (this.appeal.content !== 'undefined' && typeof appealContent.body !== 'undefined'){
      //appealContent.body = this.replaceAll(appealContent.body, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
      this.appeal.content = appealContent;
    }
  }
  get appealContent(): AppealContent {
    return this.appeal.content;
  }

  @Input()
  set appealCodes(appealCodes: AppealCode){
    this.appeal.codes = appealCodes || 'Loading...';
    if (this.appeal.codes !== 'undefined'){
      this.appeal.codes = appealCodes;
    }
  }
  get appealCodes(): AppealCode {
    return this.appeal.codes;
  }

  ngOnInit() {
  }

/*
  addLineBreaks(obj){
    var headline = obj.headline;
    var body = obj.body;
    var encodedBody = encodeURIComponent(body);
    encodedBody = this.replaceAll(encodedBody, '%0A', '<br>');
    var decodedBody = decodeURIComponent(encodedBody);
    obj.body = decodedBody;
    var encodedHeadline = encodeURI(headline);
    encodedHeadline = this.replaceAll(encodedHeadline, '%0A', '<br>');
    var decodedHeadline = decodeURI(encodedHeadline);
    obj.headline = decodedHeadline;
    return obj;
  }
*/
  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }


}
