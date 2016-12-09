import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppealContent, AppealCallout } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';
import { Template } from '../../../preview.service';
import * as _ from 'lodash';

declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css'],
  providers: [RestoreService]
})
export class AppealContentComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealContent>();
  @Output() canceled = new EventEmitter<AppealContent>();
  @Output() imageSaved = new EventEmitter<any>();
  @Output() calloutSaved = new EventEmitter<any>();

  private changed = false;

  private _content: AppealContent;

  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  checkChanged(){
    if (_.isEqual(this.content, this._content)){
      this.changed = false;
    }
    else {
      this.changed = true
    };
  }

  private _appealId;
  @Input()
  set appealId(id){
    this._appealId = id;
    console.log(id);
  };
  get appealId(){
    return this._appealId;
  }
  @Input()
  set content(data: AppealContent){
    this._content = data;
    if (!this._content.callout){
      this._content.callout = new AppealCallout();
    }
    this.restoreService.setItem(data);
  }
  get content(): AppealContent {
    return this.restoreService.getItem();
  }

  save() {
    this.restoreService.setItem(this._content);
    this.saved.emit(this._content);
    this.checkChanged();
  }
  cancel() {
    this._content = this.restoreService.restoreItem();
    this.canceled.emit(this._content);
  }
  onImageSaved(data){
    this.imageSaved.emit(data);
  }
  onCalloutSaved(data){
    this.calloutSaved.emit(data);
  }

  ngOnInit() {
    var self = this;
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}
