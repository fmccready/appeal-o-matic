import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appeal } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css']
})
export class AppealContentComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealContent>();
  constructor(private restoreService: RestoreService<AppealContent>) {
  }

  @Input()
  set content(appealContent: AppealContent){
    this.restoreService.setItem(appealContent);
  }
  get content(): AppealContent {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
interface AppealContent {
  headline: string;
  url: string;
  body: string;
  ps: string;
  image: {
    url: string;
    code: string;
    utm: string;
  };
}