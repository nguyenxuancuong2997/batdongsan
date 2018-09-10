import { NgModule } from '@angular/core';
import { ImgDirective } from './img.directive';

@NgModule({
  exports:[
    ImgDirective
  ],
  declarations: [
    ImgDirective
  ]
})
export class ImgResizeModule { }
