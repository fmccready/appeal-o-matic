import { Component, OnInit, Pipe } from '@angular/core';
import { AppealService } from '../appeal.service';
import { CampaignService } from '../campaign.service';
import 'rxjs/Rx';
import { Appeal } from '../models/appeal';
import { Campaign } from '../models/campaign';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css']
})
export class AppealListComponent implements OnInit {
  appeals: Appeal[];
  private campaigns: Campaign[];

  constructor(private appealService: AppealService, private campaignService: CampaignService) { }

  getAppeals(){
    this.appealService.getAppeals().subscribe(
      data => { this.appeals = data; console.dir(data); },
      error => { console.log(error) },
      () => { console.log('loadAppeals complete') }
    );
    this.campaignService.getCampaigns().subscribe(
      data => this.campaigns = data,
      error => console.log(error)
    );
    for (var i=0; i<= this.appeals.length; i++){
      //START HERE TOMORRRRRRRRRRRRRRRRRRRRRRRROW!!!!!
    }
  }

  deleteAppeal(id) {
    this.appealService.removeAppeal(id).subscribe(
      success => {
        console.log(success);
        this.appealService.loadAppeals();
      },
      error => { console.log('something bad happened in deleteAppeal') },
      () => { console.log('deleteAppeal complete') }
    );
  }

  ngOnInit() {
    this.getAppeals();
  }

}
