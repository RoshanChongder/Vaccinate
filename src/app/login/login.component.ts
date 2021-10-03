import { Component, OnInit , EventEmitter , Output } from '@angular/core';
import { FormGroup , FormControl , FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedin = new EventEmitter(); 
  loginForm : FormGroup ;
  errMsg : string = '' ;
  showLogOut : boolean = false; 

  constructor( private router : Router , private formBuilder : FormBuilder , private loginService : LoginServiceService ) { 

      this.loginForm = formBuilder.group({
        id : ['' , Validators.required ] , 
        passWord : [ '' , [ Validators.required , Validators.minLength(8) ] ]
      });
  }

  ngOnInit(): void {
  }

  login(){
    console.log( this.loginForm.value);
    let obj : any = {
      passWord : this.loginForm.controls.passWord.value , 
      emailId  : this.loginForm.controls.id.value 
    }

    console.log( obj );
    this.loginService.singIn( obj ).subscribe(
      ( response ) => {
        console.log("Response came from the server");
        console.log(response);
        if ( response.status ==  true ){
          console.log("Login successful");
          this.showLogOut = true;
          this.loggedin.emit();   // let the parent know that te login was successful
          setTimeout( ()=> this.router.navigate(['/slot']) , 1000 ) ;
        }else {
          console.log("login failed");
        }
      } , ( error ) => {
        console.log("Error occured while logging in."); 
        this.errMsg = error.message ;
      }
    );
  }

}
