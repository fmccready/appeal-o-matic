import { Component, OnInit, Pipe, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Appeal } from '../../models/appeal';
import { Campaign } from '../../models/campaign';

import { AppealService } from '../../appeal.service';

@Component({
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css'],
  inputs: ['filters']
})
export class AppealListComponent implements OnInit {
  private appeals: Appeal[];
  private campaigns: Campaign[];
  public filters: Observable<Object>;
  constructor(private route: ActivatedRoute, private appealService: AppealService) {
  }
  setCurrentAppeal(id){
    
  }
  deleteAppeal(id) {
    this.appealService.removeAppeal(id).subscribe(
      success => {
        console.log(success);
        this.appealService.loadAppeals();
      },
      error => { console.log(error) }
    );
  }

  ngOnInit() {
    this.appealService.getAppeals().subscribe(data => this.appeals = data);

    if (this.filters){
      this.filters.subscribe(
        data => { this.appealService.filterAppeals(data) },
        error => { console.log(error) },
        () => { console.log('filters complete') }
      );
    }
  }
}
