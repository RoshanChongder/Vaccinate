import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { LoginServiceService } from './login-service.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor( private loginService : LoginServiceService , private router : Router ) { }

  canActivate() : boolean {
      //console.log("Login guard service : " , this.loginService.isUserLoggedIn() );     
      if( this.loginService.isUserLoggedIn() == "true" )
      {
        return true ;
      } else {
        this.router.navigate(['/user/login']);
        return false ;
      }
  }
}
