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

  private changed = false;

  private _content: AppealContent = new AppealContent();

  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  checkChanged(){
    console.log(this.content);
    console.log(this._content);
    if (_.isEqual(this.content, this._content)){
      this.changed = false;
    }
    else {
      this.changed = true
    };
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
  onSaved(data){
    this.imageSaved.emit(data);
  }

  ngOnInit() {

    var self = this;
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}
