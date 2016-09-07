import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plainText'
})
export class PlainTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //return value.replace((<[a-zA-Z\d\s]{1,}>) , function(txt){
      //return txt.
    //});
  }

}
