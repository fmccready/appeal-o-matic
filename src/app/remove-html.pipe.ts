import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml'
})
export class RemoveHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'space') {
      value = value.replace(/<([br /]{1,})>/g, ' ');
    }
    if (value) {
      value = value.replace(/<([a-zA-Z\d\s\/\=\"\"\:\.]{1,})>/g, '');
    }
    return value;
  }
}
