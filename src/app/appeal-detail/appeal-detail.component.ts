import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { AppealService } from '../appeal.service';
import { Appeal } from '../models/appeal';
import { CampaignService } from '../campaign.service';
import { Campaign } from '../models/campaign';

import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
@Component({
  moduleId: module.id,
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, NKDatetime],
  pipes: [DatePipe],
  providers: [Appeal]
})
export class AppealDetailComponent implements OnInit {
  appeal: Observable<Appeal[]>;

  name: FormControl = new FormControl();
  appealDetailForm: FormGroup = new FormGroup({

  });

  constructor(private appealService: AppealService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.params
      .subscribe(data => {
        this.appealService.filterAppeals(data);
      });
  }

  ngOnInit() {
    this.appeal = this.appealService.getAppeals();
    console.dir(this.appeal);
  }

  initalize(data){
    console.dir(data);
    this.appealDetailForm = this.formBuilder.group({
      name: data.info.name
    });
  }
  saveAppeal(){

  }
}
