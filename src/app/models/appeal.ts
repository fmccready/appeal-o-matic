export class Appeal {
  _id: string;
  info: AppealInfo = new AppealInfo();
  codes: AppealCode = new AppealCode();
  signoffs: AppealSignoff = new AppealSignoff;
  content: AppealContent = new AppealContent;
}
export class AppealInfo {
  name: string = '';
  sender: string = '';
  senderAddress: string = '';
  subjectLine: string = '';
  campaign: Campaign = new Campaign();
  sendDate: Date = new Date();
  scheduled: boolean = false;
}
export class AppealContent {
  headline: string = '';
  url: string = '';
  body: string = '';
  ps: string = '';
  image: Image = new Image();
}
export class AppealCode {
  utm_medium: string;
  utm_source: string;
  audience: string;
  series: number;
  resend: number;
  s_subsrc: string;
}
export class AppealElement {
  tag: string;
  text: string;
  href: string;
  src: string;
}
export class AppealSignoff {
  editor: string;
  funDev: string;
  web: string;
}


class Campaign {
  _id: string;
  name: string;
  utm: string;
}
class Image {
  url: string = '';
  code: string = '';
  utm: string = '';
}
