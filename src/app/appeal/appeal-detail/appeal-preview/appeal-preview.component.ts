import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('appealBody') appealBody: ElementRef;

  addLinkStyles(content){
    if (content){
      this.appealBody.nativeElement.innerHTML = this.replaceAll(content, '<a ', '<a style="color: #00529c; text-decoration: none; font-weight:bold;" ');
    }
  }

  @Input()
  set appealContent(appealContent: AppealContent){
    this.appeal.content = appealContent || 'Loading...';
    if (this.appeal.content !== 'Loading...'){
      this.addLinkStyles(this.appeal.content.body);
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

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }


}
