import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Campaign } from './models/campaign';

let initialCampaigns: Campaign[] = [];

interface ICampaignsOperation extends Function {
  (campaigns: Campaign[]): Campaign[];
}

@Injectable()
export class CampaignService {
  private _campaignUrl = 'http://192.168.18.82:3000/api/v1/campaign/';
  private _campaigns$: BehaviorSubject<Campaign[]>;

  constructor(private http: Http) {
    this._campaigns$ = <BehaviorSubject<Campaign[]>>new BehaviorSubject([]);
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.http.get(this._campaignUrl).map(this.extractData).subscribe(
      data => {
        this._campaigns$.next(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  addCampaign(campaign: Campaign) {
    let ebody = JSON.stringify(campaign || null);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(this._campaignUrl, ebody, options).subscribe(
      success => {this.loadCampaigns();},
      error => {console.log(error);}
    );
  }

  removeCampaign(id: String): Observable<Response> {
    return this.http.delete(this._campaignUrl + id);
  }

  getCampaigns(): Observable<Campaign[]> {
    return this._campaigns$.asObservable();
  }
  getCampaign(id): Observable<Response> {
    return this.http.get(this._campaignUrl + id);
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
