import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RDAPMASTERAPI } from '../apienvironment/api-master-environment';
import { marketmodel } from 'src//app/package/api/model/master/rd_model_market';
@Injectable({
  providedIn: 'root'
})
export class RdMasterApiService {
  private headers;
  private idToken;
  private param;
  private httpOption;
  private marketmodel:marketmodel;
  constructor(private https: HttpClient) {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + idToken.idToken,
      }),
    };

  }
  public masterSearch(url, param): Observable<any> {
    console.log(url);
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.post<any>(url, param, this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }
  public masterAdd(url:string, addparam:any): Observable<any> {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.post<any>(url,addparam,this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }
  public masterUpdate(url:string, addparam:any): Observable<any> {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.put<any>(url,addparam,this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }
  public masterSearchDDL(url): Observable<any> {
    console.log(url);
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }

  public getMasterDataById(url):Observable<any>{
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }

  public deleteMasterDataById(url):Observable<any>{
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.delete<any>(url, this.httpOption).pipe(
      catchError((error) => {
        console.log(error);
        return throwError({
          error,
        });
      })
    );
  }
}