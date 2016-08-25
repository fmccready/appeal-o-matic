import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AppealContent } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css'],
  providers: [RestoreService]
})
export class AppealContentComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealContent>();
  @Output() canceled = new EventEmitter<AppealContent>();
  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  @Input()
  set appealContent(appealContent: AppealContent){
    this.restoreService.setItem(appealContent);
  }
  get appealContent(): AppealContent {
    return this.restoreService.getItem();
  }
  save() {
    console.dir(this.restoreService.getItem());
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealContent = this.restoreService.restoreItem();
    this.canceled.next(this.appealContent);
  }

  ngOnInit() {
  }
}
