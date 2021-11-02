import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FindSlotComponent } from '../find-slot/find-slot.component';
import { FormsModule } from '@angular/forms';
import { SlotRoutingModule } from './slot-routing.module' ;

@NgModule({
  declarations: [
    FindSlotComponent
  ],
  imports: [
    CommonModule ,
    HttpClientModule ,
    FormsModule ,
    SlotRoutingModule
  ]
})
export class SlotModule { }
