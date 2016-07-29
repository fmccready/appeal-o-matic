import { Component, OnInit } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  campaign: AbstractControl;

  constructor(fb: FormBuilder) {
    this.filtersForm = fb.group({
      'campaign': ['']
    });

    this.campaign = this.filtersForm.controls['campaign'];
  }

  onSubmit(value: string):void{
    console.log(value);
  }

  ngOnInit() {
  }

}
