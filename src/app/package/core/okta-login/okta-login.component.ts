import { Component, OnInit } from '@angular/core';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';

// @ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
import { environment } from 'src/environments/environment';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-okta-login',
  template: ``
})
export class OktaLoginComponent implements OnInit {
  signIn: any;
  public CLIENT_ID = environment.oktaconfig.CLIENT_ID;
  public ISSUER = environment.oktaconfig.ISSUER;
  public LOGIN_REDIRECT_URI = environment.oktaconfig.LOGIN_REDIRECT_URI;
  public LOGOUT_REDIRECT_URI = environment.oktaconfig.LOGOUT_REDIRECT_URI;
  public SCOPE = environment.oktaconfig.SCOPE;
  public oktaConfigDetails: any;
  
  constructor(public oktaAuth: OktaAuth) {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, you still
       * need to configure the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: this.ISSUER.split('/oauth2')[0],
      clientId: this.CLIENT_ID,
      redirectUri: this.LOGIN_REDIRECT_URI,
      logo: 'assets/angular.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Angular & Company',
        },
      },
      authClient: oktaAuth,
      useInteractionCodeFlow: true
    });
  }
  ngOnInit() {
    // When navigating to a protected route, the route path is saved as the `originalUri`
    // If no `originalUri` is saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: this.SCOPE
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }

}