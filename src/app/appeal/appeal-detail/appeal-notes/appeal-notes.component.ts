import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-notes',
  templateUrl: 'appeal-notes.component.html',
  styleUrls: ['appeal-notes.component.css'],
  providers: [RestoreService]
})
export class AppealNotesComponent implements OnInit {
  @Output() saved = new EventEmitter<String>();
  constructor(private restoreService: RestoreService<String>) { }

  @Input()
  set notes(data: String){
    this.restoreService.setItem(data);
  }
  get notes(): String {
    return this.restoreService.getItem();
  }
  save() {
    this.saved.emit(this.restoreService.getItem());
  }
  cancel() {
    this.restoreService.restoreItem();
  }

  ngOnInit() {
  }
}
