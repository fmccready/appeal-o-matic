import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  @Input()
  set content(appealContent: AppealContent){
    this.restoreService.setItem(appealContent);
  }
  get content(): AppealContent {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.restoreService.restoreItem();
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', container: 'body', html: true});
    });
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
}
