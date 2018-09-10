import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { HeaderComponent } from './header/header.component';
import { SlideComponent } from './slide/slide.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { LienheComponent } from './lienhe/lienhe.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutes
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        SlideComponent,
    ContentComponent,
    FooterComponent,
    LienheComponent
]
})
export class HomeModule { }