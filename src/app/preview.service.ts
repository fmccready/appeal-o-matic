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
      id:'fastAppeal',
      name: 'US I58 Fast'
    },
    {
      id:'hhdAppeal',
      name: 'US High Holy Days'
    },
    {
      id:'hhdLargeAppeal',
      name: 'US High Holy Days - Large Image'
    },
    {
      id:'canhhdAppeal',
      name: 'CAN High Holy Days'
    },
    {
      id:'canhhdLargeAppeal',
      name: 'CAN High Holy Days - Large Image'
    },
    {
      id:'canStandardAppeal',
      name: 'CAN Standard'
    },
    {
      id:'canFastAppeal',
      name: 'CAN Fast'
    },
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
}