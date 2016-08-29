import { Campaign } from './campaign';
import { Optional } from '@angular/core';
export class Appeal {
  _id: string;
  info: AppealInfo = new AppealInfo();
  codes: AppealCode = new AppealCode();
  signoffs: AppealSignoff[] = [];
  emailContent: AppealContent = new AppealContent();
  private departments = ['Fundraising', 'Editorial', 'Web'];
  constructor(){
    for (let d of this.departments){
      this.signoffs.push(new AppealSignoff(d));
    }
  }
}
export class AppealInfo {
  name: string;
  sender: string;
  senderAddress: string;
  subjectLine: string;
  campaign: any;
  sendDate: Date;
  scheduled: boolean;
}
export class AppealContent {
  headline: string;
  url: string;
  body: AppealElement[];
  ps: string;
  image: string[];
}
export class AppealCode {
  utm_medium: string;
  utm_source: string;
  sustainer: boolean;
  resend: number;
  s_src: string;
  s_subsrc: string;
}
export class AppealElement {
  tag: string;
  text: string;
  href: string;
  src: string;
}
export class AppealSignoff {
  name: string;
  signature: boolean;
  department: string;
  constructor(@Optional() department: string){
    this.department = department;
  }
}
