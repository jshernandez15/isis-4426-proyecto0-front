import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string): string {
    if(value == null) return "";
    return window.location.origin + "/public/" + encodeURI( value.replace(/\ /g, "-") );
  }

}
