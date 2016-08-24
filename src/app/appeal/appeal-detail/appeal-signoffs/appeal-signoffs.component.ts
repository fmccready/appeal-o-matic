import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestoreService } from '../../../restore.service';
import { AppealSignoff } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-signoffs',
  templateUrl: 'appeal-signoffs.component.html',
  styleUrls: ['appeal-signoffs.component.css']
})
export class AppealSignoffsComponent implements OnInit {
  @Input() signoffs: AppealSignoff;
  @Output() onSaved = new EventEmitter<AppealSignoff>();
  @Output() onCanceled = new EventEmitter<AppealSignoff>();
  constructor(private restoreService: RestoreService<AppealSignoff>) { }

  ngOnInit() {
  }
}
