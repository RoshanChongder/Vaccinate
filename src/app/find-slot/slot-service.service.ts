import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotServiceService {

  constructor(private http: HttpClient) { }

  getState(): Observable<any> {
    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/admin/location/states").pipe(
      catchError(this.handleError)
    );
  }

  getDistrict( distId : any): Observable<any> {
    return this.http.get<any>("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + distId ).pipe(
      catchError(this.handleError)
    );
  }

  getSlotDetailWithDistrict( distId : any , date : any ) : Observable<any> {
    //console.log("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=721&date=29-09-2021");
    date =  date.slice(-2) + date.slice(-5,-3) + date.slice(0,4) ; 
    //console.log( "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + distId +"&date=" + date );
    
    
    return this.http.get<any>( "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + distId +"&date=" + date )
    .pipe(
      catchError(this.handleError)
    ); 
  }

  getSlotDetailWithPinCode( pincode : any , date : any ) : Observable<any> {
    
    date =  date.slice(-2) + date.slice(-5,-3) + date.slice(0,4) ; 
    
    return this.http.get<any>( "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode +"&date=" + date )
    .pipe(
      catchError(this.handleError)
    ); 
  }

  formatDate( date : any ) : void {
    
  }

  private handleError(err: HttpErrorResponse) {
    let msg;
    if (err.error instanceof Error) {
      console.log("Client side error occured - ", err.error.message);
      msg = err.error.message;
    } else {
      console.log("Server side error occured - ", err.status);
      console.log(err);
      msg = err.status;
    }

    return throwError(msg);
  }


}
