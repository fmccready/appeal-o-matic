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
      country: 'United States',
      text:2,
      image:1
    },
    {
      id:'fastAppeal',
      name: 'US I58 Fast',
      country: 'United States',
      text:2,
      image:1
    },
    {
      id:'hhdAppeal',
      name: 'US High Holy Days',
      country: 'United States',
      text:2,
      image:1
    },
    {
      id:'hhdLargeAppeal',
      name: 'US High Holy Days - Large Image',
      country: 'United States',
      text:2,
      image:1
    },
    {
      id:'canhhdAppeal',
      name: 'CAN High Holy Days',
      country: 'Canada',
      text:2,
      image:1
    },
    {
      id:'canhhdLargeAppeal',
      name: 'CAN High Holy Days - Large Image',
      country: 'Canada',
      text:2,
      image:1
    },
    {
      id:'canStandardAppeal',
      name: 'CAN Standard',
      country: 'Canada',
      text:2,
      image:1
    },
    {
      id:'canFastAppeal',
      name: 'CAN Fast',
      country: 'Canada',
      text:2,
      image:1
    },
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
  country: string;
  text: number;
  image: number;
}