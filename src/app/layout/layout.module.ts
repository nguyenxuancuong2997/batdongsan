import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes } from './layout.routing';
import { MenuModule } from '../_shared/modules/menu/menu.module';
import { FooterModule } from '../_shared/modules/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    FooterModule,
    LayoutRoutes
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }