import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appeal } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-content',
  templateUrl: 'appeal-content.component.html',
  styleUrls: ['appeal-content.component.css']
})
export class AppealContentComponent implements OnInit {
  private _appeal: Appeal;
  @Output() saved = new EventEmitter<Appeal>();
  constructor(private restoreService: RestoreService<Appeal>) {
  }

  @Input()
  set appeal(appeal: Appeal){
    this.restoreService.setItem(appeal);
    this._appeal = appeal;
  }
  get appeal(): Appeal {
    return this.restoreService.getItem();
  }
  save() {
    console.log(this.restoreService.getItem());
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this._appeal = this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
