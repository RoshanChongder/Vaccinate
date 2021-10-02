import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FindSlotComponent } from './find-slot/find-slot.component';
import { LoginComponent } from './login/login.component'
const routes: Routes = [

  { path : "home"   , component : HomeComponent } ,
  { path : "signup" , component : SignupComponent } , 
  { path : "slot"   , component : FindSlotComponent } ,     // apply route guard
  { path : "login"   , component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
