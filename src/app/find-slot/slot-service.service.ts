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
