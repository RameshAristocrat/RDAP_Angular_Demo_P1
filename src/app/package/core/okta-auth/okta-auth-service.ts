import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class OktaAuthService {
  public CLIENT_ID=environment.oktaconfig.CLIENT_ID;
  public ISSUER=environment.oktaconfig.ISSUER;
  public LOGIN_REDIRECT_URI=environment.oktaconfig.LOGIN_REDIRECT_URI;
  public LOGOUT_REDIRECT_URI=environment.oktaconfig.LOGOUT_REDIRECT_URI;
  public SCOPE=environment.oktaconfig.SCOPE;
  //public oktaAuth:OktaAuth;
  public oktaConfigDetails:any;
  oktaAuth = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer:  this.ISSUER,
    redirectUri:  this.LOGIN_REDIRECT_URI,
    pkce: true,
    scopes:this.SCOPE
  });
  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;
  constructor(private router: Router,private httpClient: HttpClient) {
    //this.oktaConfigDetails=[];
    // this.httpClient.get("assets/config/appconfig.json").subscribe(data => {
    //   console.log(data[0][data[0].environment][0].oktaconfig[0]);
    //   this.oktaConfigDetails = data[0][data[0].environment][0].oktaconfig[0];
    //   this.oktaAuth = new OktaAuth({
    //     clientId: this.oktaConfigDetails.clientid,
    //     issuer:  this.oktaConfigDetails.issuer,
    //     redirectUri:  this.oktaConfigDetails.loginredirecturi,
    //     pkce: true,
    //     scopes:this.oktaConfigDetails.scope
    //   });
    // });
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then(val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
      this.oktaAuth.isAuthenticated().then(val=>{
        console.log(val)
        if(val==true){
            this.handleAuthentication();
            console.log(this.oktaAuth.token.parseFromUrl());
        }
    })
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
      if(this.oktaAuth.token){
        const tokenContainer = await this.oktaAuth.token.parseFromUrl();
        console.log("tokenContainer",tokenContainer)
            this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
            this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);
            localStorage.setItem('testObject', JSON.stringify(this.oktaAuth));
            if (await this.isAuthenticated()) {
              this.observer?.next(true);
            }
        
            // Retrieve the saved URL and navigate back
            const url = sessionStorage.getItem('okta-app-url') as string;
            this.router.navigateByUrl(url);
      }
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
  }
}