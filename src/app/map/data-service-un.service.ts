import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceUNService {

  constructor( private http : HttpClient ) { }

  // this api is provided by the united nation https://covid-19-data.unstatshub.org/datasets/cases-country/api
  getCovidDate() : Observable<any> {
    return this.http.get<any>("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    .pipe( catchError( this.handleError ) );
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
