import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {SlotServiceService} from './slot-service.service';
@Component({
  selector: 'app-find-slot',
  templateUrl: './find-slot.component.html',
  styleUrls: ['./find-slot.component.css']
})
export class FindSlotComponent implements OnInit {

  states : any = [] ;
  districts : any = [] ; 
  date : any ;
  centers : any[] = [] ; 
  copyenters : any[] = [] ;
  pincode : any ; 
  feesType : String = 'Both' ;
  vacineType : String = 'All' ;
  
  selectedState : any ; 
  selectedDistrict : any ; 

  showdist : boolean = false ;
  showstate : boolean = false ;
  showdate : boolean = false ;
  searchByDist : boolean = true ;
  searchByPincode : boolean = false; 
  showTable : boolean = false ;
  invalidPin : boolean = false ; 


  // to search uisng district 
  sdist(){
    this.searchByDist = true ; 
    this.searchByPincode = false ;
    this.date = undefined ;
  }

  // to search using pin code 
  spin(){
    this.searchByDist = false ; 
    this.searchByPincode = true ;
    this.date = undefined ;
  }

  constructor(private slotService : SlotServiceService ) { 
    // this will load the states  
    this.slotService.getState().subscribe(
       ( response ) => {
         this.states = response.states ;
         //console.log( this.states[0] );
         this.showstate = true ;       
       } , ( error ) => {
         //console.log("Error while fetching states");
         this.states = [] ;
       }
     ) ;
  }

  findByPincode(){
    //console.log( this.pincode , typeof this.pincode );
    this.slotService.getSlotDetailWithPinCode( this.pincode.toString() , this.date ).subscribe(
      ( response ) => {
        //console.log( response );
        this.centers = response.sessions ; this.copyenters = this.centers ; 
        this.showTable = true ; 
        this.searchByPincode = false ;
      } , ( error ) => {
        //console.log("Some error oured while fetching data wrt to pincode");
      }
    )
    
  }
  
  ngOnInit(): void { }


  getDistrict( state :any ){
    this.selectedState = state ; 
    //console.log( state  , typeof state );
    this.slotService.getDistrict( state ).subscribe(
      ( response ) => {
        //console.log( response );
        this.districts = response.districts ;
        //console.log( this.districts[0] );
        this.showdist = true ;
      } , ( err ) => {
        //console.log( "Error occured while fetching" );
        this.districts = [] ;
      }
    ) ;
  }

  find()
  {
    console.log( this.selectedState ,  this.selectedDistrict , this.date );
    this.slotService.getSlotDetailWithDistrict( this.selectedDistrict , this.date )
      .subscribe( ( response ) => {
        //console.log( "Response came from the server - " , response );
        this.centers = response.sessions ; this.copyenters = this.centers ; 
        this.showTable = true ; 
        this.showdate = this.showdist = this.showstate = false ;
      } , ( err ) => {
        //console.log("Some error occured while fetching slots.");
      } );
  }

  validatePincode()
  {
    if( this.pincode.toString().length == 6 ) this.invalidPin = false ;
    else this.invalidPin = true ;
  }
 
  filterFees( type : String ){
    //console.log( "For - " , type );
    
    this.feesType = type ;
    if( type == 'Both' ) this.centers = this.copyenters ; 
    else {
      this.centers = [] ;
      for( let i=0 ; i< this.copyenters.length ; i++ ){
        if( this.vacineType == 'All' ){
          if( this.copyenters[i].fee_type == type ) 
          this.centers.push( this.copyenters[i]);
        }else{
          if( this.copyenters[i].fee_type == type && this.copyenters[i].vaccine == this.vacineType ) 
          this.centers.push( this.copyenters[i]);
        }
      }
    }
  }

  filterVaccine( type : String) {
    console.log( "For - " , type );

    this.vacineType = type ;
    if( type == 'All' ) this.centers = this.copyenters ; 
    else {
      this.centers = [] ;
      if( this.feesType == 'Both'){
        for( let i=0 ; i< this.copyenters.length ; i++ ){
          if (this.copyenters[i].vaccine == type ) 
          this.centers.push( this.copyenters[i]);
        }
      }else {
        for( let i=0 ; i< this.copyenters.length ; i++ ){
          if (this.copyenters[i].vaccine == type && this.copyenters[i].fee_type == this.feesType ) 
          this.centers.push( this.copyenters[i]);
        }
      }  
    }
  }

  back(){
    this.showTable = false ; 
    this.showstate = true ;
    this.searchByDist = true ;
    this.vacineType = 'All';
    this.feesType = 'Both';
  }
}
