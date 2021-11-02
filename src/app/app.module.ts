import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//import { SignupComponent } from './signup/signup.component';
//import { FindSlotComponent } from './find-slot/find-slot.component';
import { HttpClientModule } from '@angular/common/http';
//import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //SignupComponent,
    //FindSlotComponent,
    //LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
