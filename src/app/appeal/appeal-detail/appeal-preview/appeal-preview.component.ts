import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AppealContent } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-preview',
  templateUrl: 'appeal-preview.component.html',
  styleUrls: ['appeal-preview.component.css']
})
export class AppealPreviewComponent implements OnInit {
  preview: any;
  appealData: any;
  constructor(private http: Http) {
    /*
    this.http.get('http://localhost:3000/test.html').subscribe(
      data => {
        console.dir(data);
        this.preview = new BehaviorSubject(data);
        this.getPreview();
      },
      error => {
        console.log(error);
      }
    );
    */
  }
  @Input()
  set appealContent(appealContent: AppealContent){
    this.appealData = appealContent || 'Loading...';
    if (this.appealData !== 'undefined'){
      this.appealData = this.addLineBreaks(appealContent);
      console.log(this.appealData.body);
    }
  }
  get appealContent(): AppealContent {
    return this.appealData;
  }
  ngOnInit() {
  }

  addLineBreaks(obj){
    var headline = obj.headline;
    var body = obj.body;
    var encodedBody = encodeURI(body);
    encodedBody = this.replaceAll(encodedBody, '%0A', '&lt;br&gt;');
    var decodedBody = decodeURI(encodedBody);
    obj.body = decodedBody;
    var encodedHeadline = encodeURI(headline);
    encodedHeadline = this.replaceAll(encodedHeadline, '%0A', '<br>');
    var decodedHeadline = decodeURI(encodedHeadline);
    obj.headline = decodedHeadline;
    return obj;
  }
  escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

/*
  getPreview(){
    var previewElement = document.getElementById('preview');
    var htmlPreview = this.preview.subscribe(
      data => {
        previewElement.innerHTML = data._body;
      },
      error => {console.log(error)}
    );
  }
  */
  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }
}
