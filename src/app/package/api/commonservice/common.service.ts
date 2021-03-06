import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';
import {  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
  isAuthenticated: boolean = false;
  private oktaAuthToken = new Subject<any>();
  private menuJsonData = new Subject<any>();
  public menuJson:any;
  
  public refData = new Subject<any>();
 
  constructor(private https: HttpClient,
    private _router: Router, _location: Location) {
  }
  setOktaAuthToken(data) {
    this.oktaAuthToken.next(data);
  }

  getOktaAuthToken(): Observable<any> {
      return this.oktaAuthToken.asObservable();
  }

  setMenuJson(data) {
    this.menuJson = data;
    this.menuJsonData.next(data);
  }

  getMenuJson(): Observable<any> {
    return this.menuJsonData.asObservable();
  }
 
}