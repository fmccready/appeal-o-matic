import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Appeal, AppealInfo } from './models/appeal';

let initialAppeals: Appeal[] = [];

interface IAppealsOperation extends Function {
  (appeals: Appeal[]): Appeal[];
}


@Injectable()
export class AppealService {
  private _appealUrl = 'http://' + window.location.hostname + ':3000/api/v1/appeal/';
  private _populateCampaign = 'populate=info.campaign';
  private _appeals$: Subject<Appeal[]>;
  private _appeals:Appeal[] = [];
  currentAppeal: Observable<Appeal>;

  constructor(private http: Http) {
    this._appeals$ = new Subject<Appeal[]>();
    this.loadAppeals();
  }

  loadAppeals(){
    this.http.get(this._appealUrl).map(this.extractData).subscribe(
      data => {
        /*
        for (var i=0; i<data.length; i++){
          if (data[i].info && data[i].info.sendDate){
            data[i].info.sendDate = new Date (data[i].info.sendDate);
          }
        }
        */
        this._appeals = data;
        this._appeals$.next(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAppealById(id){
    let temp;
    this._appeals$.subscribe(data => {
      temp = data.find(function(app){
        if (app._id === id){
          return true;
        }
        else {
          return false;
        }
      });
    });

    return temp;
  }
  addAppeal(newAppealInfo: AppealInfo) {
    var newAppeal = new Appeal();
    newAppeal.info = newAppealInfo;
    let body = JSON.stringify(newAppeal);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(this._appealUrl, body, options).subscribe(
      success => {console.log(success);this.loadAppeals();},
      error => {console.log(error);}
    );
  }

  updateAppeal(appeal: Appeal) {
    let body = appeal;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({
      headers: headers
    });
    this.http.patch(this._appealUrl + appeal._id, body, options).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  removeAppeal(id: string): Observable<Response> {
    return this.http.delete(this._appealUrl + id);
  }

  _makeGetRequest(url){
    this.http.get(url).map(this.extractData).subscribe(
      data => {
        //this._appeals$.next(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  filterAppeals(filters) {
    if (filters.campaign) {
      var url = this._appealUrl + '?query={"info.campaign":"'+ filters.campaign.utm + '"}';
      this._makeGetRequest(url);
    }
    if (filters.appealId) {
      var url = this._appealUrl + filters.appealId;
      this._makeGetRequest(url);
    }
  }


  getAppeals(): Observable<Appeal[]> {
    return this._appeals$;
    //return this._appeals$.asObservable();
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
