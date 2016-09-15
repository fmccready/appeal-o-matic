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
  @Output() saved = new EventEmitter<Appeal>();
  constructor(private restoreService: RestoreService<Appeal>) { }

  @Input()
  set appeal(appeal: Appeal){
    this.restoreService.setItem(appeal);
  }
  get appeal(): Appeal {
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
