import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, Observable } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { Appeal } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css']
})
export class AppealDetailComponent implements OnInit {
  private appeal$ = new Subject();
  data = false;
  
  private qs: any;
  constructor(private appealService: AppealService, private route: ActivatedRoute) {
    this.subscribeToAppealFromQueryString();    
  }
  subscribeToAppealFromQueryString() {
    this.route.params
      .subscribe(data => {
        this.qs = data;
        if (this.qs.hasOwnProperty('appealId')){
          this.appeal$.next(this.appealService.getAppealById(this.qs.appealId));
          this.data = true;
          /*
          this.appealService.getAppeal(this.qsAppealId.appealId).subscribe(
            appealData => {
              if (appealData){
                this.appeal = appealData.json();
                this.appealSubject.next(this.appeal);
              }
            },
            error => {console.log(error);}
          );
          */
        }
      });
  }

  onInfoSaved(data) {
    this.appealService.updateAppeal(data);
    this.appeal$.next(data);
  }
  onContentSaved(data){
    this.appealService.updateAppeal(data);
    this.appeal$.next(data);
  }
  onCodesSaved(data){
    this.appealService.updateAppeal(data);
    this.appeal$.next(data);
  }
  onSignoffsSaved(data){
    this.appealService.updateAppeal(data);
    this.appeal$.next(data);
  }

  ngOnInit() {
  }

}
