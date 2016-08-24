import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestoreService } from '../../../restore.service';
import { AppealCode } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-codes',
  templateUrl: 'appeal-codes.component.html',
  styleUrls: ['appeal-codes.component.css']
})
export class AppealCodesComponent implements OnInit {
  @Input() codes: AppealCode;
  @Output() onSaved = new EventEmitter<AppealCode>();
  @Output() onCanceled = new EventEmitter<AppealCode>();
  constructor(private restoreService: RestoreService<AppealCode>) { }

  ngOnInit() {
  }

}
