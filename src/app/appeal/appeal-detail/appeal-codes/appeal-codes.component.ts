import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealCode } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-appeal-codes',
  templateUrl: 'appeal-codes.component.html',
  styleUrls: ['appeal-codes.component.css'],
  providers: [RestoreService]
})
export class AppealCodesComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealCode>();
  @Output() canceled = new EventEmitter<AppealCode>();
  private _codes: AppealCode;
  constructor(private restoreService: RestoreService<AppealCode>) {
  }
  private changed = false;
  valueChanged(){
    this.changed = true
  }
  @Input()
  set codes(appealCode: AppealCode){
    this._codes = appealCode;
    this.restoreService.setItem(appealCode);
    this.changed = false;
  }
  get codes(): AppealCode {
    return this.restoreService.getItem();
  }
  save() {
    this.restoreService.setItem(this._codes);
    this.saved.emit(this._codes);
    this.changed = false;
  }
  cancel() {
    this._codes = this.restoreService.restoreItem();
    this.canceled.emit(this._codes);
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}

