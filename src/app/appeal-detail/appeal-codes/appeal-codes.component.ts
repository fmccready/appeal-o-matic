import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealCode } from '../../models/appeal';
import { RestoreService } from '../../restore.service';

@Component({
  moduleId: module.id,
  selector: 'app-appeal-codes',
  templateUrl: 'appeal-codes.component.html',
  styleUrls: ['appeal-codes.component.css'],
  providers: [ AppealCode, RestoreService ]
})
export class AppealCodesComponent implements OnInit {
  @Input() codes: AppealCode;
  @Output() onSaved = new EventEmitter<AppealCode>();
  @Output() onCanceled = new EventEmitter<AppealCode>();
  constructor(private restoreService: RestoreService<AppealCode>) { }

  ngOnInit() {
  }

}
