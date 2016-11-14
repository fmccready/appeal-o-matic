import { Injectable } from '@angular/core';
import { Appeal } from './models/appeal';
import { BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class PreviewService {
  public appeal: BehaviorSubject<Appeal> = new BehaviorSubject(new Appeal());
  public readonly templates: Array<Template> = [
    {
      id:'standardAppeal',
      name: 'Standard',
      country: 'United States'
    },
    {
      id:'hhdAppeal',
      name: 'US High Holy Days',
      country: 'United States'
    },
    {
      id:'hhdLargeAppeal',
      name: 'US High Holy Days - Large Image',
      country: 'United States'
    },
    {
      id:'canhhdAppeal',
      name: 'CAN High Holy Days',
      country: 'Canada'
    },
    {
      id:'canhhdLargeAppeal',
      name: 'CAN High Holy Days - Large Image',
      country: 'Canada'
    },
    {
      id:'canStandardAppeal',
      name: 'CAN Standard',
      country: 'Canada'
    },
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
  country: string;
}