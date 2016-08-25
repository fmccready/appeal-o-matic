import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealCode } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';


@Component({
  selector: 'app-appeal-codes',
  templateUrl: 'appeal-codes.component.html',
  styleUrls: ['appeal-codes.component.css'],
  providers: [RestoreService]
})
export class AppealCodesComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealCode>();
  @Output() canceled = new EventEmitter<AppealCode>();
  constructor(private restoreService: RestoreService<AppealCode>) { }

  @Input()
  set appealCodes(appealCodes: AppealCode){
    this.restoreService.setItem(appealCodes);
  }
  get appealCodes(): AppealCode {
    return this.restoreService.getItem();
  }
  save() {
    console.dir(this.restoreService.getItem());
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.appealCodes = this.restoreService.restoreItem();
    this.canceled.next(this.appealCodes);
  }

  ngOnInit() {
  }

}
