import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent ,
    SignupComponent
  ],
  imports: [
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    UserRoutingModule
  ]
})
export class UserModule { }