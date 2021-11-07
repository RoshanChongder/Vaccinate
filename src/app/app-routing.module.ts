import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

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

  {
    path : "statistics" , 
    loadChildren : () => import('./map/map.module').then( m => m.MapModule )
  } ,

  { path : "**" , redirectTo : 'home' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }