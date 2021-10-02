import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup ;
  errMsg : string = '' ;

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
        console.log("Login successful");
        this.router.navigate(['/slot']);
      } , ( error ) => {
        console.log("Error occured while logging in."); 
        this.errMsg = error.message ;
      }
    );
  }

}
