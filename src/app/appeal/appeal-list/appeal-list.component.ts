import { Component, OnChanges, Pipe, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { Appeal } from '../../models/appeal';
import { Campaign } from '../../models/campaign';

import { AppealService } from '../../appeal.service';
import { RestoreService } from '../../restore.service';

@Component({
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css']
})
export class AppealListComponent implements OnChanges {
  constructor(private route: ActivatedRoute, private appealService: AppealService, private restoreService: RestoreService<Appeal[]>) {
  }
  deleteAppeal(id) {
    this.appealService.removeAppeal(id).subscribe(
      success => { console.log(success); },
      error => { console.log(error); }
    );
  }
  @Input()
  set appeals(appeals: Appeal[]){
    this.restoreService.setItem(appeals);
  }
  get appeals(): Appeal[]{
    return this.restoreService.getItem();
  }

  ngOnChanges(changes) {
    this.restoreService.setItem(changes.appeals.currentValue);
  }
}
