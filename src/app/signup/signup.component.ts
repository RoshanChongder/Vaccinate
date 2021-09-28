import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regForm : FormGroup ;

  constructor( private formBuilder : FormBuilder ) { 

    this.regForm = formBuilder.group({
      firstName : [ '' , Validators.required ] , 
      lastName  : [ '' , Validators.required ] , 
      passWord  : [ '' , [ Validators.minLength(8) , Validators.required ] ] ,
      confirmPassWord : [ '' , [ Validators.required ] ] , 
      gender    : [ '' , Validators.required ] , 
      emailId   : [ '' , [ Validators.required ] ] ,
      phoneNo   : [ '' , [ Validators.required , validatePhone] ] , 
      dateOfBirth : [ '' , [ Validators.required ] ] 
    }) ;
  
  }

  ngOnInit(): void {
  }

  postDate(){
    console.log( this.regForm );
    
  }

}

function validatePhone( phone : FormControl )
{
    let pattern =  /^\d{10}$/ ; 
    return phone.value.match( pattern ) ? null : {
        InvalidPhone : {
          message : "Invalid Phone number"
        }
    } ;
}
