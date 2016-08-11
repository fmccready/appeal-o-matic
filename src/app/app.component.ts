import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, FiltersComponent]
})
export class AppComponent {
  title = 'Appeal-o-matic';
}
