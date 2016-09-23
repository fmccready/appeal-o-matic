import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appeal } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';


@Component({
  selector: 'app-appeal-codes',
  templateUrl: 'appeal-codes.component.html',
  styleUrls: ['appeal-codes.component.css'],
  providers: [RestoreService]
})
export class AppealCodesComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealCode>();
  constructor(private restoreService: RestoreService<AppealCode>) { }

  @Input()
  set codes(appeal: AppealCode){
    this.restoreService.setItem(appeal);
  }
  get codes(): AppealCode {
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
interface AppealCode {
  utm_medium: string;
  utm_source: string;
  audience: string;
  series: number;
  resend: number;
  s_subsrc: string;
}
