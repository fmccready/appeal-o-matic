import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { PreviewService } from '../../preview.service';
import { Appeal } from '../../models/appeal';
import { Settings } from '../../models/settings';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: 'appeal-detail.component.html',
  styleUrls: ['appeal-detail.component.css'],
})
export class AppealDetailComponent implements OnInit {
  private appeal: Appeal;
  private template: string;
  private settings: Settings = new Settings();
  private groupId: string;
  private relatedAppeals: Array<Appeal> = [];
  private _currentAppeal$: Observable<Appeal>;
  private _appealSub: Subscription;
  private _routeSub: Subscription;
  private _groupSub: Subscription;

  constructor(private appealService: AppealService, private route: ActivatedRoute, private router: Router, private previewService: PreviewService) {
    this.appeal = new Appeal();
    this.settings.campaign = false;
    this.settings.sendDate = false; 
    this.settings.delete = false;
    this.settings.active = '';
  }
  checkTemplate(tmpl){
    if (this.template !== tmpl){
      this.template = tmpl;
      this.router.navigate(['/appeal', this.appeal._id, tmpl]);
    }
  }
  onInfoSaved(data) {
    this.appeal.info = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
    this.checkTemplate(data.template);
  }
  onInfoCanceled(data) {
    this.appeal.info = data;
    this.previewService.appeal.next(this.appeal);
  }

  onContentSaved(data) {
    this.appeal.content = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onContentCanceled(data) {
    this.appeal.content = data;
    this.previewService.appeal.next(this.appeal);
  }

  onCodesSaved(data) {
    this.appeal.codes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onCodesCanceled(data){
    this.appeal.codes = data;
    this.previewService.appeal.next(this.appeal);
  }

  onSignoffsSaved(data) {
    this.appeal.signoffs = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onSignoffsCanceled(data) {
    this.appeal.signoffs = data;
    this.previewService.appeal.next(this.appeal);
  }

  onNotesSaved(data) {
    this.appeal.notes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onNotesCanceled(data) {
    this.appeal.notes = data;
    this.previewService.appeal.next(this.appeal);
  }

  onImageSaved(data){
    this.appealService.uploadImage(data, this.appeal._id);
  }

  onAppealDuplicated(data){
    this.groupSubscription(data);
  }
  
  setAppeal(qs) {
    if (qs.hasOwnProperty('appealId')) {
      this.appealService.setCurrentAppeal(qs.appealId);
    }
  }
  currentAppealSubscription(){
    if (!this._currentAppeal$){
      console.warn('A subscription is being made to _currentAppeal$');
      this._currentAppeal$ = this.appealService.getCurrentAppeal();
      this._appealSub = this._currentAppeal$.subscribe(data => {
        console.log('data from _appealSub');
        console.log(data);
        this.appeal = data;
        if (!this.template){
          this.template = data.info.template;
        }
        else {
          this.checkTemplate(data.info.template);
        }
        
        this.groupId = data.info.group;
        console.log('set groupId to :' + this.groupId);
        console.log(this.appeal);
        if (this.appeal._id) {
          this.settings.active = this.appeal._id;
        }
        this.previewService.appeal.next(this.appeal);
        if (this.groupId){
          this.groupSubscription(this.groupId);
        }
      });
    }
  }
  ngOnInit() {
    if (!this._routeSub){
      console.warn('A subscription is being made to route.params');
      this._routeSub = this.route.params
      .subscribe(queryString => {
        this.setAppeal(queryString);
        this.currentAppealSubscription();
      });
    }
  }
  groupSubscription(id){
    console.log('groupSubscription');
    console.log(id);
    if (!this._groupSub){
      this._groupSub = this.appealService.getAppeals().flatMap(a => {this.relatedAppeals = []; return a;}).filter(function(appeal: Appeal, index: Number){
        if (appeal.info.group === id){
          return true;
        }
        else {
          return false;
        }
      }).subscribe(
        data => { this.relatedAppeals.push(data); console.log(data); }
      );
    }
  }

  ngOnDestroy(){
    if(this._routeSub){
      console.info('unsubscribing from _routeSub');
      this._routeSub.unsubscribe();
    }
    if(this._groupSub){
      console.info('unsubscribing from _groupSub');
      this._groupSub.unsubscribe();
    }
    if(this._currentAppeal$){
      console.info('unsubscribing from _currentAppeal$');
      this._appealSub.unsubscribe();
    }
  }

}
