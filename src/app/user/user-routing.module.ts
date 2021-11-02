import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from '../signup/signup.component' ;
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
    { path : "signup" , component : SignupComponent } , 
    { path : "login"  , component : LoginComponent } ,
    { path : "**"     , redirectTo : 'login' }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }