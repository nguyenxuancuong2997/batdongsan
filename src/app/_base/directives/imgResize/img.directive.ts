import { Directive, ElementRef } from '@angular/core';

declare var $;
@Directive({
  selector: '[imgLocal]'
})
export class ImgDirective {

  constructor(el: ElementRef) {
    let img = el.nativeElement;
    let urlBase = img.getAttribute('src');
    let index = urlBase.lastIndexOf('.');
    let urlname = urlBase.substring(0, index);
    let urlextent = urlBase.substring(index);
    let w = $(window).width();
    if (w < 768) {
      //moblie 
      let value = `${urlname}_mobile${urlextent}`;
      img.setAttribute('src', value);
    } else if (w < 1280) {
      //tablet
      let value = `${urlname}_tablet${urlextent}`;
      img.setAttribute('src', value);
    } else if (w < 1440) {
      //pc
    } else {
      //tv
      let value = `${urlname}_tv${urlextent}`;
      img.setAttribute('src', value);
    }
  }

}
