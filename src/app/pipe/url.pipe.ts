import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string): string {
    return window.location.href + "public/" + encodeURI( value.replace(/\ /g, "-") );
  }

}
