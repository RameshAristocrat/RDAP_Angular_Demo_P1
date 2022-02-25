// import { Component, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'RDAP';
//   isAuthenticated: boolean = false;
//   onActivate(e) {
//     if ((e.constructor.name)==="LoginComponent"){ // for example
//             window.scroll(0,0);
//     }
// }

// }


import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../app/package/core/okta-auth/okta-auth-service';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
//import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'okta-app';
  isAuthenticated: boolean = false;
  public oktaAuthToken: any;
  constructor(public oktaAuthserv: OktaAuthService, 
    private _router: Router, _location: Location,private router: Router,) {
    this.oktaAuthToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if((this.oktaAuthToken!= null) && (this.oktaAuthToken.idToken.expiresAt < moment(Date.now()).unix())){
      this.oktaAuthserv.logout();
      this.router.navigate(['/callback'])
    }
//     if((this.oktaAuthToken!= null) && (this.oktaAuthToken.idToken.expiresAt > moment(Date.now()).unix())){
//     }
    //this.oktaAuthserv.logout();
    // if (this.oktaAuthToken) {
    //    if(moment(this.oktaAuthToken.idToken.expiresAt).isBefore(moment(moment.now()).unix())){
    //   //   localStorage.clear();
    //   //   sessionStorage.clear();
    //   //   this._router.navigate(["http://localhost:8084/login"]);
    //   }
    // }
  }

  ngOnInit(): void {
    // this.oktaAuthserv.$isAuthenticated.subscribe(val => {
    //   this.isAuthenticated = val
    // });
  }
}