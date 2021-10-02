import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vaccinate';
  state : boolean = true ;
  constructor(){
    localStorage.setItem( "isloggedIn" , "false" ) ;
  }

  changeState( eventref : any  ) {
    console.log("Reached in the paret component ");
    
    
  }


  
}
