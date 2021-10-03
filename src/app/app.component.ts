import { Component } from '@angular/core';
import { FindSlotComponent } from './find-slot/find-slot.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vaccinate';
  state : boolean = false ;

  constructor( private router : Router ){
    localStorage.setItem( "isloggedIn" , "false" ) ;
    this.state = false;
  }

  changeState( eventref : any  ) {
    console.log("Reached in the paret component " , eventref);
    console.log( eventref["showLogOut"] );
    if( eventref instanceof FindSlotComponent   ) this.state = true ;  
  }

  logOut(){
    localStorage.setItem("isloggedIn" , "false");
    this.state = false;
    this.router.navigate(['/home']);
  }

  findslot(){
    this.router.navigate(['/login']);
  }

  joinus(){
    this.router.navigate(['/signup']);
  }


  
}
