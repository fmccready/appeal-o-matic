import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Campaign } from './campaign';

let initialCampaigns: Campaign[] = [];

interface ICampaignsOperation extends Function {
  (campaigns: Campaign[]): Campaign[];
}

@Injectable()
export class CampaignService {
  private _campaignUrl = '/api/campaigns/';
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
      },
      () => {
        console.log('loadCampaigns (campaign.service) - complete');
      }
    )
  }

  addCampaign(campaign: Campaign) {
    let body = JSON.stringify(campaign);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this._campaignUrl, body, options);
  }

  removeCampaign(id: String): Observable<Response> {
    return this.http.delete(this._campaignUrl + id);
  }

  /*
  loadCampaigns() {
    return this.http.get(this._campaignUrl).map(this.extractData);
  }
  */

  getCampaigns(): Observable<Campaign[]> {
    return this._campaigns$.asObservable();
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
