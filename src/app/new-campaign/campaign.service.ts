import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Campaign } from './campaign';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class CampaignService {

  existingCampaigns: Subject<Campaign[]> = new BehaviorSubject<Campaign[]>(null);

  public getCampaigns(): void {
    this.existingCampaigns.next(this.http.get(this.campaignUrl)
      .map(this.extractData)
      .catch(this.handleError));
  }
  constructor(private http: Http) {
  }

  private campaignUrl = '/api/campaigns';

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
    return this.http.post(this.campaignUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
