import { Component, OnChanges, Pipe, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { Appeal } from '../../models/appeal';
import { Campaign } from '../../models/campaign';
import { Settings } from '../../models/settings';

import { AppealService } from '../../appeal.service';

@Component({
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css']
})
export class AppealListComponent implements OnChanges {

  private appealList: Appeal[];
  constructor(private route: ActivatedRoute, private appealService: AppealService) {
  }
  deleteAppeal(id) {
    this.appealService.removeAppeal(id).subscribe(
      data => {
        this.appealList = this.appealList.filter(function(obj){
          return obj._id !== id;
        })
      }
    );
  }
  @Input()
  set appeals(appeals: Appeal[]) {
    this.appealList = appeals;
  }
  get appeals(): Appeal[] {
    return this.appealList;
  }

  @Input() settings: Settings;

  ngOnChanges(changes) {
    this.appealList = changes.appeals.currentValue;
  }
}
