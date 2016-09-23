export class Appeal {
  _id: string;
  info: AppealInfo;
  codes: AppealCode;
  signoffs: AppealSignoff;
  emailContent: AppealContent;
}
export interface AppealInfo {
  name: string;
  sender: string;
  senderAddress: string;
  subjectLine: string;
  campaign: string;
  sendDate: Date;
  scheduled: boolean;
}
export interface AppealContent {
  headline: string;
  url: string;
  body: string;
  ps: string;
  image: {
    url: string;
    code: string;
    utm: string;
  };
}
export interface AppealCode {
  utm_medium: string;
  utm_source: string;
  audience: string;
  series: number;
  resend: number;
  s_subsrc: string;
}
export interface AppealElement {
  tag: string;
  text: string;
  href: string;
  src: string;
}
export interface AppealSignoff {
  editor: string;
  funDev: string;
  web: string;
}
