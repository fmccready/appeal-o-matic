import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestoreService } from '../../../restore.service';
import { AppealSignoff } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-signoffs',
  templateUrl: 'appeal-signoffs.component.html',
  styleUrls: ['appeal-signoffs.component.css'],
  providers: [RestoreService]
})
export class AppealSignoffsComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealSignoff>();
  constructor(private restoreService: RestoreService<AppealSignoff>) { }

  @Input()
  set signoffs(appeal: AppealSignoff){
    this.restoreService.setItem(appeal);
  }
  get signoffs(): AppealSignoff {
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
  }
}
