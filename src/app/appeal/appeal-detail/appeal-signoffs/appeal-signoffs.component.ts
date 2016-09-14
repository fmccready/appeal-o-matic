import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestoreService } from '../../../restore.service';
import { Appeal } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-signoffs',
  templateUrl: 'appeal-signoffs.component.html',
  styleUrls: ['appeal-signoffs.component.css'],
  providers: [RestoreService]
})
export class AppealSignoffsComponent implements OnInit {
  private _appeal: Appeal;
  @Output() saved = new EventEmitter<Appeal>();
  constructor(private restoreService: RestoreService<Appeal>) { }

  @Input()
  set appeal(appeal: Appeal){
    this.restoreService.setItem(appeal);
    this._appeal = appeal;
  }
  get appeal(): Appeal {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this._appeal = this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
