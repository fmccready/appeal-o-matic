import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Appeal, AppealInfo } from './models/appeal';

interface IAppealsOperation extends Function {
  (appeals: Appeal[]): Appeal[];
}

@Injectable()
export class AppealService {
  private _appealUrl = 'http://' + window.location.hostname + ':3000/api/v1/appeal/';
  public _appeals$: BehaviorSubject<Appeal[]> = new BehaviorSubject([]);
  private appeals:Appeal[] = [];
  public currentAppeal$: BehaviorSubject<any> = new BehaviorSubject({});
  private currentAppealId: string;
  constructor(private http: Http) {
    //this._appeals$.next([]);
    this.currentAppeal$.next(new Appeal());
    this.loadAppeals();
  }

  loadAppeals() {
    console.log('Making HTTP request, loading appeals...');
    this.http.get(this._appealUrl).map(this.extractData).subscribe(
      data => {
        for (let d of data ){
          if (d._id === this.currentAppealId){
            this.currentAppeal$.next(d);
          }
        }
        this.appeals = data;
        this._appeals$.next(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  setCurrentAppeal(appealId) {
    this.currentAppealId = appealId;
    for (let i = 0; i < this.appeals.length; i++) {
      if (this.appeals[i]._id === appealId) {
        console.log('id match');
        console.log(this.appeals[i]);
        this.currentAppeal$.next(this.appeals[i]);
      }
    }
  }
  
  getCurrentAppeal(){
    return Observable.from(this.currentAppeal$);
  }

  addAppeal(appeal: Appeal) {
    let newAppeal = new Appeal();
    newAppeal.info = appeal.info;
    newAppeal.codes = appeal.codes;
    newAppeal.content = appeal.content;
    newAppeal.notes = appeal.notes;
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    
    this.http.post(this._appealUrl, newAppeal, options).map(this.extractData).subscribe(data => {this.appeals.push(data); this._appeals$.next(this.appeals);});
  }

  updateAppeal(appeal: Appeal) {
    console.log(appeal);
    let body = appeal;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({
      headers: headers
    });
    this.http.patch(this._appealUrl + appeal._id, body, options)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  removeAppeal(id: string): Observable<Response> {
    function findId(obj){
      return obj._id === id;
    }
    let appealToDelete = this.appeals.find(findId);
    let index = this.appeals.indexOf(appealToDelete);
    if (index > -1){
      this.appeals.splice(index, 1);
    }
    this._appeals$.next(this.appeals);
    return this.http.delete(this._appealUrl + id);
  }

  getAppeals(): Observable<Appeal[]> {
    return Observable.from(this._appeals$);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
