import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plainText'
})
export class PlainTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value){
      var pArr = value.split(/(<[brBR\s\/]{1,}>)/g);
      pArr = pArr.map((p)=> {
        var urls = p.match(/(?:href=")+([^\'\"]+)/g);
        if (urls){
          p = p.concat('<br>');
          for (var i=0; i<urls.length; i++){
            if (i == urls.length-1){
			        urls[i] = urls[i].replace('href="', '');
              p = p.concat(urls[i]);
            }
            else {
			        urls[i] = urls[i].replace('href="', '');
              p = p.concat(urls[i] + '<br>');
            }
          }
          return p;
        }
        else {
          return p;
        }
      });
      return pArr.join('');
      //return value.replace(/(<[brBR\s\/]{1,}>)/g, '<br>');
    }
    else {
      return value;
    }

    //var urls = value.match(/href="([^\'\"]+)/g);

  }

}
