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
  private _appeals$: BehaviorSubject<Appeal[]> = new BehaviorSubject([]);
  public currentAppeal$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: Http) {
    this.loadAppeals();
  }

  loadAppeals() {
    this.http.get(this._appealUrl).map(this.extractData).subscribe(
      data => {
        this._appeals$.next(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAppealById(appealId) {
    this._appeals$.subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === appealId) {
            console.log(data[i]);
            this.currentAppeal$.next(data[i]);
          }
        }
      }
    );

    return this.currentAppeal$;
  }

  addAppeal(newAppealInfo: AppealInfo) {
    let newAppeal = new Appeal();
    newAppeal.info = newAppealInfo;
    let body = JSON.stringify(newAppeal);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(this._appealUrl, body, options).subscribe(
      success => { this.loadAppeals(); },
      error => { console.log(error); }
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
        this._appeals$.next(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  filterAppeals(filters) {
    let url = this._appealUrl;
    if (filters.campaign) {
      url += '?query={"info.campaign":"' + filters.campaign.utm + '"}';
    }
    if (filters.appealId) {
      url = this._appealUrl + filters.appealId;
    }
    this._makeGetRequest(url);
    return this._appeals$;
  }


  getAppeals(): Observable<Appeal[]> {
    console.log(this._appeals$);
    return this._appeals$;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
