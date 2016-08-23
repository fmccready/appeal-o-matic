import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealContent } from '../../models/appeal';
import { RestoreService } from '../../restore.service';

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css'],
  providers: [ AppealContent, RestoreService ]
})
export class AppealContentComponent implements OnInit {
  @Input() emailContent: AppealContent;
  @Output() onSaved = new EventEmitter<AppealContent>();
  @Output() onCanceled = new EventEmitter<AppealContent>();
  constructor(private restoreService: RestoreService<AppealContent>) { }

  ngOnInit() {
  }

}
