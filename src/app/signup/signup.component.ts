import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormControl, Validators } from '@angular/forms';
import { UserServiceService } from './user-service.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup ;
  success: boolean = false ;
  failure: boolean = false ;
  message: string = "" ;

  constructor( private router: Router , private formBuilder: FormBuilder , private userService: UserServiceService ) { 

    this.regForm = formBuilder.group({
      firstName: [ '' , Validators.required ], 
      lastName: [ '' , Validators.required ], 
      passWord: [ '' , [ Validators.minLength(8) , Validators.required ] ],
      confirmPassWord: [ '' , [ Validators.required ] ],
      gender: [ '' , Validators.required ],
      emailId: [ '' , [ Validators.required ] ],
      phoneNo: [ '' , [ Validators.required , validatePhone] ],
      dateOfBirth: [ '' , [ Validators.required ] ] 
    });
  }

  ngOnInit(): void {}
  
  postDate(){
    
    let obj = {

      "name": {
        "firstName": this.regForm.controls.firstName.value , 
        "lastName": this.regForm.controls.lastName.value 
      } , 
      "passWord": this.regForm.controls.passWord.value , 
      "gender": this.regForm.controls.gender.value   , 
      "emailId": this.regForm.controls.emailId.value  ,
      "phoneNo": this.regForm.controls.phoneNo.value  , 
      "dateOfBirth": this.regForm.controls.dateOfBirth.value
    }

    this.userService.signUp( obj ).subscribe(
      (response) => {
        this.success = true ; 
        this.failure = false;
        this.message = response.message ;
      },
      (err) => {
        this.failure = true ;
        this.success = false ;
        this.message = err;
      }
    );
  }
  toLogin(){ this.router.navigate(['/user/login']); }
}

function validatePhone( phone : FormControl )
{
    let pattern =  /^\d{10}$/ ; 
    return phone.value.match( pattern ) ? null : {
        InvalidPhone : {
          message: "Invalid Phone number"
        }
    };
}
