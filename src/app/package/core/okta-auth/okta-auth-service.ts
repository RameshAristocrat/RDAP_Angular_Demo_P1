import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../api/commonservice/common.service';

@Injectable({ providedIn: 'root' })
export class OktaAuthService {
  public CLIENT_ID = environment.oktaconfig.CLIENT_ID;
  public ISSUER = environment.oktaconfig.ISSUER;
  public LOGIN_REDIRECT_URI = environment.oktaconfig.LOGIN_REDIRECT_URI;
  public LOGOUT_REDIRECT_URI = environment.oktaconfig.LOGOUT_REDIRECT_URI;
  public SCOPE = environment.oktaconfig.SCOPE;
  public oktaConfigDetails: any;
  public oktaAuth = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer: this.ISSUER,
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true,
    scopes: this.SCOPE,
    tokenManager: {
      storage: 'localStorage'
    }
  });
  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;
  constructor(private router: Router, private commonService :CommonService ) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
        this.observer = observer;
      });
  }
  isAuthenticated() {
    let isAccessToken: boolean = false;
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken?.idToken){
      isAccessToken = true;
      this.commonService.setOktaAuthToken(idToken?.idToken);
    }
    return isAccessToken;
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: this.SCOPE
    })
   
  }

  async handleAuthentication() {
    if(this.oktaAuth.isLoginRedirect() == false && JSON.parse(localStorage.getItem("okta-token-storage")) == null){
       this.login('/home');
    }
    else if(this.oktaAuth.isLoginRedirect() == true && JSON.parse(localStorage.getItem("okta-token-storage")) == null)
    {
      let tokenContainer = await  this.oktaAuth.token.parseFromUrl();
      this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
      this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);
      this.router.navigate(['/home/dashboard']);

   }
   else{
    if(JSON.parse(localStorage.getItem("okta-token-storage"))){
      this.router.navigate(['/home/dashboard']);
    }
   }
  }

  // async logout() {
  //   await this.oktaAuth.tokenManager.clear();
  // }
  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


}