import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Appeal } from './models/appeal';

let initialAppeals: Appeal[] = [];

interface IAppealsOperation extends Function {
  (appeals: Appeal[]): Appeal[];
}


@Injectable()
export class AppealService {
  private _appealUrl = '/api/appeals/';
  private _appeals$: BehaviorSubject<Appeal[]>;

  constructor(private http: Http) {
    this._appeals$ = <BehaviorSubject<Appeal[]>>new BehaviorSubject([]);
    this.loadAppeals();
  }

  loadAppeals(){
    this.http.get(this._appealUrl).map(this.extractData).subscribe(
      data => {
        console.log('data from appealService');
        console.dir(data);
        this._appeals$.next(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('loadAppeals (appeal.service) - complete');
      }
    )
  }
  addAppeal(campaign: Appeal) {
    let body = JSON.stringify(campaign);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this._appealUrl, body, options);
  }

  removeAppeal(id: String): Observable<Response> {
    return this.http.delete(this._appealUrl + id);
  }

  getAppeals(): Observable<Appeal[]> {
    return this._appeals$.asObservable();
  }

  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }

  private handleError(error: any){
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
