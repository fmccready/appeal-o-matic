import { Campaign } from './campaign';
export class Appeal {
    info: AppealInfo;
    emailContent: AppealContent;
    codes: AppealCode;
    signoffs: AppealSignoff[];
}
class AppealInfo {
  name: string;
  sender: string;
  senderAddress: string;
  subjectLine: string;
  campaign: string;
  sendDate: Date;
  scheduled: boolean;
}
class AppealContent {
  headline: string;
  url: string;
  body: AppealElement[];
  image: string[];
}
class AppealCode {
  utm_medium: string;
  utm_source: string;
  sustainer: boolean;
  resend: number;
  s_src: string;
  s_subsrc: string;
}
class AppealElement {
  tag: string;
  text: string;
  href: string;
  src: string;
}
class AppealSignoff {
  name: string;
  signature: boolean;
  department: string;
}
