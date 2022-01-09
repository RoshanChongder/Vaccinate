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
  loginForm: FormGroup ;
  errMsg: string = '' ;
  showLogOut: boolean = false; 

  constructor( private router: Router , private formBuilder: FormBuilder , private loginService: LoginServiceService ) { 

      this.loginForm = formBuilder.group({
        id: ['' , Validators.required ] , 
        passWord: [ '' , [ Validators.required , Validators.minLength(8) ] ]
      });
  }

  ngOnInit(): void {}

  login(){
    let obj : any = {
      passWord: this.loginForm.controls.passWord.value , 
      emailId: this.loginForm.controls.id.value 
    }

    this.loginService.singIn( obj ).subscribe(
      ( response ) => {
        if ( response.status ==  true ){
          this.showLogOut = true;
          this.loggedin.emit();   
          setTimeout( ()=> this.router.navigate(['/find/slot']) , 1000 ) ;
        }else {
          // console.log("login failed");
        }
      } , ( error ) => {
        // show banner notification
        this.errMsg = error.message ;
      }
    );
  }

}
