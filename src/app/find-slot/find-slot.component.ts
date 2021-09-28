import { Component, OnInit } from '@angular/core';
import {SlotServiceService} from './slot-service.service';
@Component({
  selector: 'app-find-slot',
  templateUrl: './find-slot.component.html',
  styleUrls: ['./find-slot.component.css']
})
export class FindSlotComponent implements OnInit {

  states : any = [] ;
  districts : any = [] ;
  showdist : boolean = false ;
  showstate : boolean = false ;

  constructor(private slotService : SlotServiceService ) { 
     this.slotService.getState().subscribe(
       ( response ) => {
         this.states = response.states ;
         console.log( this.states[0] );
         this.showstate = true ;       
       } , ( error ) => {
         console.log("Error while fetching states");
         this.states = [] ;
       }
     ) ;
  }

  ngOnInit(): void {
  }

  getDistrict( state :any ){
    console.log( state  , typeof state );
    this.slotService.getDistrict( state ).subscribe(
      ( response ) => {
        console.log( response );
        this.districts = response.districts ;
        console.log( this.districts[0] );
        this.showdist = true ;
      } , ( err ) => {
        console.log( "Error occured while fetching" );
        this.districts = [] ;
      }
    ) ;
  }

}
