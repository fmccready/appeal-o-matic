import { Injectable } from '@angular/core';
import { Appeal } from './models/appeal';
import { BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class PreviewService {
  public appeal: BehaviorSubject<Appeal> = new BehaviorSubject(new Appeal());
  public findTemplate(id:string){
    console.log('something called findTemplate()');
    let opts;
    this.templates.map(function(t){
      if (t.id === id){
        console.log(t.options);
        opts = t.options;
      }
    });
    return opts;
  }
  public readonly templates: Array<Template> = [
    {
      id:'standardAppeal',
      name: 'Standard',
      country: 'United States',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'fastAppeal',
      name: 'US I58 Fast',
      country: 'United States',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'hhdAppeal',
      name: 'US High Holy Days',
      country: 'United States',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'hhdLargeAppeal',
      name: 'US High Holy Days - Large Image',
      country: 'United States',
      options: {
        body: [
          {
            title: 'Headline',
            tooltip: 'Paste in the headline here.',
            config: {height:80}
          },
          {
            title: 'Body',
            tooltip: 'Paste in the body copy here. <br><br>Only include the copy below the salutation and above the signature. <br><br>Double-click on the existing links to add the donation form URL.',
          },
          {
            title: 'Custom Signature',
            tooltip: 'Put a custom signature here. Leave blank for the standard signature.',
            config: {height:80}
          },
          {
            title: 'PS',
            tooltip: 'Paste in the PS copy here. <br><br>Include the letters \'PS\'.',
            config: {height:80}
          }
        ],
        image:1
      }
    },
    {
      id:'canhhdAppeal',
      name: 'CAN High Holy Days',
      country: 'Canada',
      options:{
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'canhhdLargeAppeal',
      name: 'CAN High Holy Days - Large Image',
      country: 'Canada',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'canStandardAppeal',
      name: 'CAN Standard',
      country: 'Canada',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
    {
      id:'canFastAppeal',
      name: 'CAN Fast',
      country: 'Canada',
      options: {
        body: [{
          title: 'headline',
          tooltip: 'Paste in the headline here.',
          config: {height:80}
        }],
        image:1
      }
    },
  ];
  constructor() { }
}
export interface Template {
  id: string;
  name: string;
  country: string;
  options: {
    body: [{
      title: string,
      tooltip: string,
      config?: any
    }];
    image: number;
  }
}