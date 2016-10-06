import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { PreviewService } from '../../preview.service';
import { Appeal } from '../../models/appeal';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css'],
})
export class AppealDetailComponent implements OnInit {
  private appeal: Appeal = new Appeal();
  data = false;
  private qs: any;
  constructor(private appealService: AppealService, private route: ActivatedRoute, private router: Router, private previewService: PreviewService) {
    console.log(this.appeal);
  }
  
  getAppealFromRoute() {
    this.route.params
      .subscribe(queryString => {
        this.qs = queryString;
        if (this.qs.hasOwnProperty('appealId')) {
          this.appealService.getAppealById(this.qs.appealId).subscribe(data => {
            this.appeal = data; 
            if (data.hasOwnProperty('_id')){ 
              this.previewService.appeal.next(data); 
            }});
        }
      });
  }

  onInfoSaved(data) {
    let template = this.appeal.info.template;
    this.appeal.info = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
    if (template !== data.template){
      this.router.navigate(['/appeal', this.appeal._id, data.template]);
    }
  }
  onContentSaved(data) {
    this.appeal.content = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onCodesSaved(data) {
    this.appeal.codes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onSignoffsSaved(data) {
    this.appeal.signoffs = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onNotesSaved(data) {
    this.appeal.notes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }

  ngOnInit() {
    this.getAppealFromRoute();
  }
}
