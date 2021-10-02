import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private isloggedIn : boolean = false ;

  constructor( private http : HttpClient ) { 
  }

  singIn( credentials : any ) : Observable<any> {
    
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>( "http://localhost:3000/login" , credentials ,
    { headers : header }).pipe(
        tap( ( data ) => { 
          console.log("Inside the tap - " , data ); 
          if( data.status == true ){
            this.isloggedIn = true ;
            localStorage.setItem("isloggedIn" , "true");
          }  
          console.log("Loggedin set to - - > " , this.isloggedIn );
        } ) ,
        catchError( this.handleError )
    ) ;
    
  }

  isUserLoggedIn() : string {
    //return this.isloggedIn ;
    let data : any = localStorage.getItem("isloggedIn");
    return  data ;
  }

  private handleError(err: HttpErrorResponse) {
    let msg;
    if (err.error instanceof Error) {
      console.log("Client side error occured - ", err.error.message);
      msg = err.error.message;
    } else {
      console.log("Server side error occured - ", err.status);
      console.log(err);
      msg = err.error.message;
    }

    return throwError(msg);
  }

}
