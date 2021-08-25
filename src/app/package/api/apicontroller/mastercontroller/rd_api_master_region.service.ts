import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RDAPMASTERAPI } from '../../apienvironment/api-master-environment';
//import { Injectable } from '../../viewmodel/master/rd_model_region';
@Injectable({
  providedIn: 'root'
})
export class RdApiMasterRegionService {
  //private intakeManagerData = RDAPMASTERAPI;
  private headers;
  private idToken;
  private param;
  private httpOption;
  constructor(private https: HttpClient) {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    //let header = new Headers({ 'Authorization': `Bearer ${idToken}` });
    this.httpOption = {
      headers: new HttpHeaders({
        Authorization: "Bearer "+idToken.idToken,
      }),
    };

  }
  public regionSearch(): Observable<any> {
    debugger
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers : new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization":"Bearer "+idToken.idToken.idToken
      })
    }
    let URL = RDAPMASTERAPI.region_search;
    this.param={pageNumber: 0,
    pageSize: 0,
    filters: [
      {
        field: "Region",
        operator: "Contains",
        value: ""
      }
    ]}
    return this.https.post<any>(URL, this.param, this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }
}