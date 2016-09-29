import { Injectable } from '@angular/core';
import { Appeal } from './models/appeal';
import { BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class PreviewService {
  public appeal: BehaviorSubject<Appeal> = new BehaviorSubject(new Appeal());
  public templates: Array<Template> = [
    {
      id:'standardAppeal',
      name: 'Standard'
    },
    {
      id:'otherAppeal',
      name: 'Other'
    }
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
}