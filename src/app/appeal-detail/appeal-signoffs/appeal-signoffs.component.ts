import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealSignoff } from '../../models/appeal';
import { RestoreService } from '../../restore.service';

@Component({
  moduleId: module.id,
  selector: 'app-appeal-signoffs',
  templateUrl: 'appeal-signoffs.component.html',
  styleUrls: ['appeal-signoffs.component.css'],
  providers: [ AppealSignoff, RestoreService ]
})
export class AppealSignoffsComponent implements OnInit {
  @Input() signoffs: AppealSignoff;
  @Output() onSaved = new EventEmitter<AppealSignoff>();
  @Output() onCanceled = new EventEmitter<AppealSignoff>();
  constructor(private restoreService: RestoreService<AppealSignoff>) { }

  ngOnInit() {
  }
}
