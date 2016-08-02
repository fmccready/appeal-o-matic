import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Campaign } from './campaign';

@Injectable()
export class CampaignService {
  private _campaigns: BehaviorSubject<List<Campaign>> = new BehaviorSubject(List([]));
  private _campaignUrl = '/api/campaigns';
  //existingCampaigns: Subject<Campaign[]> = new BehaviorSubject<Campaign[]>(null);
  /*
  public getCampaigns(): void {
    this.existingCampaigns.next(this.http.get(this.campaignUrl)
      .map(this.extractData)
      .catch(this.handleError));
  }
  */
  constructor(private http: Http) {
    this.loadCampaigns();
  }
  public loadCampaigns(){
    return this.http.get(this._campaignUrl)
      .map(res => res.json())
      .subscribe(
        data => this._campaigns = data,
        err => this.logError(err),
        () => console.log('Campaign loading complete')
      );
  }
  logError(err){
    console.error('Something went wrong: ' + err);
  }











  private extractData(res: Response){
    let body = res.json();
    return body.data || {};
  }
  private handleError(error: any){
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  addCampaign(newCampaign: Campaign): Observable<Campaign> {
    let body = JSON.stringify(newCampaign);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this._campaignUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
