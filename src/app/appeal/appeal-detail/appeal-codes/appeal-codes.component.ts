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
