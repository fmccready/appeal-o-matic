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
  @Output() canceled = new EventEmitter<AppealSignoff>();
  constructor(private restoreService: RestoreService<AppealSignoff>) { }

  @Input()
  set appealSignoffs(appealSignoff: AppealSignoff){
    this.restoreService.setItem(appealSignoff);
  }
  get appealSignoffs(): AppealSignoff {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealSignoffs = this.restoreService.restoreItem();
    this.canceled.next(this.appealSignoffs);
  }

  ngOnInit() {
  }
}
