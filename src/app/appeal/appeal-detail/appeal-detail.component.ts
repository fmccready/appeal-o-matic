import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AppealCodesComponent } from './appeal-codes/appeal-codes.component';
import { AppealContentComponent } from './appeal-content/appeal-content.component';
import { AppealInfoComponent } from './appeal-info/appeal-info.component';
import { AppealSignoffsComponent } from './appeal-signoffs/appeal-signoffs.component';

import { RestoreService } from '../../restore.service';
import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';
import { AppealCode } from '../../models/appeal';
import { AppealContent } from '../../models/appeal';
import { AppealInfo } from '../../models/appeal';
import { AppealSignoff } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css'],
  directives: [AppealInfoComponent, AppealContentComponent, AppealCodesComponent, AppealSignoffsComponent],
  providers: [RestoreService]
})
export class AppealDetailComponent implements OnInit {
  appeal$: Observable<Appeal[]>;
  appeal: Appeal = new Appeal();

  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.route.params
      .subscribe(data => {
        this.appealService.filterAppeals(data);
        this.subscribeToAppeal(data);
      });
  }

  subscribeToAppeal(appeal) {
    this.appealService.getAppeals().subscribe(
      data => {
        if (data.length && (data[0]._id == appeal.appealId)){
            this.appeal = data[0];
        }
      },
      error => {console.log(error)}
    );
  }

  onSaved(appealInfo) {
    var appeal = this.appeal;
    appeal.info = appealInfo;
    console.dir(appeal);
    this.appealService.updateAppeal(appeal);
  }

  ngOnInit() {
  }

  saveAppeal(){

  }
}
