import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { FindSlotComponent } from './find-slot/find-slot.component';
//import { LoginGuardService } from './login/login-guard.service';

const routes: Routes = [

  { path : "home"   , component : HomeComponent } ,
  
  { 
    path : "user" , 
    loadChildren : () => import('./user/user.module').then( m => m.UserModule )
  } ,

  {
    path : "find" ,
    loadChildren : () => import('./slot/slot.module').then( m => m.SlotModule )
  } ,

  { path : "**"     , redirectTo : 'home' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
