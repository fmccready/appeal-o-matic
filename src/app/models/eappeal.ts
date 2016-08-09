import { Campaign } from './campaign';
export class Eappeal {
  constructor(
    public name?: string,
    public campaign?: Campaign,
    public sender?: string,
    public senderAddress?: string,
    public subjectLine?: string,
    public sendDate?: Date
  ){}
}
