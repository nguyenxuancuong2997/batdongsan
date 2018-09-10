import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneRingComponent } from './phone-ring.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PhoneRingComponent,
  ],
  declarations: [PhoneRingComponent]
})
export class PhoneRingModule { }