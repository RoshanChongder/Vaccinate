import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor( private http : HttpClient ) { }

  singIn( credentials : any ) : Observable<any> {
    
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>( "http://localhost:3000/login" , credentials ,
    { headers : header }).pipe(
        catchError( this.handleError )
    ) ;
    
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
