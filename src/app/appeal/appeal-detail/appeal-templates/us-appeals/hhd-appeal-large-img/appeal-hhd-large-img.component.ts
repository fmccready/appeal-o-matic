import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

import { AppealContent, AppealCode, Appeal } from '../../../../../models/appeal';
import { Campaign } from '../../../../../models/campaign';
import { CampaignService } from '../../../../../campaign.service';
import { AppealService } from '../../../../../appeal.service';
import { PlainTextPipe } from '../../../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../../../remove-html.pipe';

import { TemplateCodes } from '../../template.controller';


@Component({
  selector: 'app-hhd-large-img-appeal',
  templateUrl: './appeal-hhd-large-img.component.html',
  styleUrls: ['./appeal-hhd-large-img.component.css']
})
export class HHDLargeAppealComponent {
  preview: any;
  private version: any = {};
  private appeal: Appeal;
  private _appealSub$;
  private body;
  private template = new TemplateCodes();
  private anchors = [];
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this._appealSub$ = this.appealService.currentAppeal$;
    this._appealSub$.subscribe(data => {
      if (data){
        this.appeal = data;
        this.body = this.template.generateBody(this.appeal);
        var self = this;
        this.body.html.forEach((item, index) => {
          let element = $('<div>' + item + '</div>');
          let a = element.find('a');
          for (let i=0; i < a.length; i++){
            this.anchors.push($(a[i]).prop('href'));
          }
        });
        this.anchors.forEach(function(item, index){

          
          $('a', 'app-hhd-large-img-appeal').css({
            'color': '#00529c',
            'textDecoration': 'none',
            'fontWeight': 'bold'
          });
        });

      }
    });
  }

  @ViewChild('htmlVersion') htmlVersion: ElementRef;
  @ViewChild('plainVersion') plainVersion: ElementRef;
  
  ngAfterViewInit(){
    console.log('after view init');
    //$(this.htmlVersion.nativeElement);
  }

  ngOnInit(){
  }
  ngOnDestory(){
    if (this._appealSub$){
      this._appealSub$.unsubscribe();
    }
  };


}
