import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml'
})
export class RemoveHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      value = value.replace(/<([a-zA-Z\d\s\/\=\"\"\:\.]{1,})>/g, '');
    }
    return value;
  }
}
