import { Injectable } from '@angular/core';
import { Appeal } from './models/appeal';
import { BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class PreviewService {
  public appeal: BehaviorSubject<Appeal> = new BehaviorSubject(new Appeal());
  constructor() { }
}
