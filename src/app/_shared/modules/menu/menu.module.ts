import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ImgResizeModule } from '../../../_base/directives/imgResize/imgResize.module';

@NgModule({
  imports: [
    CommonModule,
    ImgResizeModule
  ],
  exports:[
    MenuComponent
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
