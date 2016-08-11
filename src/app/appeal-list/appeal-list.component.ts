import { Component, OnInit, Pipe } from '@angular/core';
import { AppealService } from '../appeal.service';
import 'rxjs/Rx';
import { Appeal } from '../models/appeal';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'appeal-list-component',
  templateUrl: 'appeal-list.component.html',
  styleUrls: ['appeal-list.component.css']
})
export class AppealListComponent implements OnInit {
  appeals: Appeal[];

  constructor(private appealService: AppealService) { }

  getAppeals(){
    this.appealService.getAppeals().subscribe(
      data => { this.appeals = data; console.dir(data); },
      error => { console.log(error) },
      () => { console.log('loadAppeals complete') }
    );
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
