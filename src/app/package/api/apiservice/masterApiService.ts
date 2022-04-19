import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RDAPMASTERAPI } from '../apienvironment/api-master-environment';
import { marketmodel } from 'src/app/package/api/model/master/rd_model_market';
import { OktaAuthService } from '../../core/okta-auth/okta-auth-service';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
//import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../commonservice/common.service';
@Injectable({
  providedIn: 'root'
})
export class RdMasterApiService {
  private headers;
  private idToken;
  private param;
  private httpOption;
  private marketmodel:marketmodel; 
  isAuthenticated: boolean = false;
  public perPage = 1000;
  private gridData = new Subject<any>();
  
  public refData = new Subject<any>();
  public oktaAuthToken: any;
  public oktaIdToken: string;
  constructor(private https: HttpClient,public oktaAuthserv: OktaAuthService, private commonService: CommonService,
    private _router: Router, _location: Location) {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken){
      this.httpOption = {
        headers: new HttpHeaders({
          Authorization: "Bearer " + idToken.idToken,
        })      
      };
    }
    this.commonService.getOktaAuthToken().subscribe(res =>{
      if(res){
        this.oktaIdToken = res.idToken;
      }
    })

  }

  public refreshToken():any{
    this.oktaAuthToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    
    if(this.oktaAuthToken != null) {
     //Please do not clear this console.log ..
   // console.log('get Expire Time : ',this.oktaAuthToken, this.oktaAuthToken?.idToken.expiresAt, '< =: ',moment.utc(Date.now()).unix());
     if(this.oktaAuthToken.idToken.expiresAt < moment.utc(Date.now()).unix()){
      this.oktaAuthserv.logout();
      localStorage.clear();
      this.oktaAuthserv.login('/home');
     }
    }
  }

  public masterSearch(url, param): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken){
      this.httpOption = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + idToken.idToken.idToken
        })
      }
      return this.https.post<any>(url, param, this.httpOption).pipe(
        catchError((error) => {
          return throwError({
            error,
          });
        })
      );
    }
  }
  public masterAdd(url:string, addparam:any): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken){
      this.httpOption = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + idToken.idToken.idToken
        })
      }
      return this.https.post<any>(url,addparam,this.httpOption).pipe(
        catchError((error) => {
          return throwError({
            error,
          });
        })
      );
    }
  }
  public masterUpdate(url:string, addparam:any): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.put<any>(url,addparam,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }
  public masterSearchDDL(url): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public getMasterDataById(url):Observable<any>{
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public deleteMasterDataById(url):Observable<any>{
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.delete<any>(url, this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public getRequestPinById(url): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public managePinUpdate(url:string, addparam:any): Observable<any> {
   //this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.put<any>(url,addparam,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public masterAddFile(url:string, addparam:any): Observable<any> {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
       // "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.post<any>(url,addparam,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public getPermissionByModule(url:string, moduleName:any): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken){
      this.httpOption = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + idToken.idToken.idToken
        })
      }
      return this.https.get<any>(url+"/"+moduleName,this.httpOption).pipe(
        catchError((error) => {
          return throwError({
            error,
          });
        })
      );
    }
  }

  public checkIsManagePinAdmin(url:string): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public getMyRoles(url:string): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public oldgetFilebyfileId(url): Observable<any> {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
       // "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url, this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }

  public debuggerLog(flag,text,data){
      if(flag == true){
        console.log(text,data);
      }
  }

  public getPermission(url:string): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }


  public getFilebyfileId(url): Observable<any> {
    
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));

    this.httpOption = {
      headers: new HttpHeaders({
       // "Content-Type":"application/octet-stream",
      //  "Accept": "application/octet-stream",
        "Authorization": "Bearer " + idToken.idToken.idToken,
        'responseType': 'text'
      })
    }
   
    // return this.https.get(url, this.httpOption)
    //   .pipe(
    //     map((data: any) => {
    //       const blob = new Blob([data], {type: 'octet-stream'});
    //       return blob;
    //     })
    //   );

    //const headers = { 'responseType': 'blob' as 'json'};
  //   const body = { title: 'Test' };
  //   return this.https.get<Blob>(url,headers).subscribe({next:response=>{
  //   var blob=new Blob([response],{type:"application/octet-stream"});
  //     FileSaver.saveAs(blob,file);

  //   }, error: error => {}
  // });



  return this.https.get<Blob>(url, this.httpOption);
    // return this.https.get<Blob>(url, this.httpOption).pipe(
    //   catchError((error) => {
    //     return throwError({
    //       error,
    //     });
    //   })
    // );
  }

  // getCsvReport(url): Observable<Object> {
  //   let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));

  //   this.httpOption = {
  //     headers: new HttpHeaders({
  //       "Content-Type":"application/octet-stream",
  //     //  "Accept": "application/octet-stream",
  //       "Authorization": "Bearer " + idToken.idToken.idToken
  //     })
  //   }
  //   return this.https.get(url, this.httpOption).pipe(
  //     map(report => {
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     const blob: any = new Blob([report.data.parentXml], { type: 'octet/stream' });
  //     const url = window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = data.fileName;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     })
  //   );
  // }

  public getPermissionSideMenu(url:string): Observable<any> {
    this.refreshToken();
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));

    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken.idToken.idToken
      })
    }
    return this.https.get<any>(url,this.httpOption).pipe(
      catchError((error) => {
        return throwError({
          error,
        });
      })
    );
  }
  










  //     map(report => {
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     const blob: any = new Blob([report.data.parentXml], { type: 'octet/stream' });
  //     const url = window.URL.createObjectURL(blob);
  //     a.href = url;
  //     //a.download = data.fileName;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     })
  //   );
  // }
 
  setData(data) {
    this.gridData.next(data);
  }

  getData(): Observable<any> {
      return this.gridData.asObservable();
  }

  public getGridData(searchUrl, sortparamarr?, filterparamarr?) {
    let searchParam = this.getSearchParam(1, sortparamarr, filterparamarr);
    this.masterSearch(searchUrl, searchParam).pipe(
      switchMap((res: any) => {
        this.setData(res.data);
          const totalPages = Math.ceil(res.totalRecords/this.perPage);
          // Convert the number 20 to 20 HTTP reqs. Again, not enough info is provided.
          const req$ = Array(totalPages).fill(1).map((_, index) =>
            this.setParam(index+1, searchUrl, sortparamarr, filterparamarr)
          );
          return forkJoin(req$);
      })
    )
    .subscribe(res => {
      for(let page = 1; page < res.length; page++){
        this.setData(res[page].data);
      }
    });
  }
  setParam(pageIndex, searchUrl, sortparamarr?, filterparamarr?)
  {
    let searchParam = this.getSearchParam(pageIndex, sortparamarr, filterparamarr);
    return this.masterSearch(searchUrl, searchParam)
  }

  getSearchParam(pageIndex, sortparamarr?, filterparamarr?){
    let searchParam = { pageNumber: pageIndex, pageSize: this.perPage, filters: [], sorts: [] };
    if(filterparamarr){
      searchParam.filters = filterparamarr;
    }
    if(sortparamarr){
      searchParam.sorts = sortparamarr;
    }
    else{
      searchParam.sorts.push({ field: "Planitem", direction: "DESC" });
    }
    return searchParam;
  }

  getprojectRefValue(): Observable<any> {
    return this.refData.asObservable();
}
setprojectRefValue(data)  {
   this.refData.next(data);
}
}