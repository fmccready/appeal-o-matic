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
    console.dir(this.appealData);
  }
  get appealContent(): AppealContent {
    return this.appealData;
  }
  ngOnInit() {
  }


  getPreview(){
    var previewElement = document.getElementById('preview');
    var htmlPreview = this.preview.subscribe(
      data => {previewElement.innerHTML = data._body},
      error => {console.log(error)}
    );
  }
  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }
}
