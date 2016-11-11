import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppealContent } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';


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

  private _content: AppealContent;

  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  @Input()
  set content(data: AppealContent){
    this._content = data;
    this.restoreService.setItem(data);
  }
  get content(): AppealContent {
    return this._content;
  }
  save() {
    this.restoreService.setItem(this._content);
    this.saved.emit(this._content);
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
