import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject, Observable } from 'rxjs/Rx';

import { Appeal, AppealInfo } from './models/appeal';

interface IAppealsOperation extends Function {
  (appeals: Appeal[]): Appeal[];
}

@Injectable()
export class AppealService {
  private _appealUrl = 'http://' + window.location.hostname + ':3000/api/v1/appeal/';
  private _appeals$: Subject<Appeal[]>;
  public currentAppeal$: Subject<Appeal>;

  constructor(private http: Http) {
    this.loadAppeals();
  }

  loadAppeals() {
    this.http.get(this._appealUrl).map(this.extractData).subscribe(
      data => {
        console.log(data);
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
    if (filters.campaign) {
      let url = this._appealUrl + '?query={"info.campaign":"' + filters.campaign.utm + '"}';
      this._makeGetRequest(url);
    }
    if (filters.appealId) {
      let url = this._appealUrl + filters.appealId;
      this._makeGetRequest(url);
    }
  }


  getAppeals(): Observable<Appeal[]> {
    return Observable.from(this._appeals$);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
