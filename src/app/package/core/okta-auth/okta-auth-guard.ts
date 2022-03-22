import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './okta-auth-service'; 

@Injectable({providedIn: 'root'})
export class OktaAuthGuard implements CanActivate {
  constructor(private okta: OktaAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let authenticated = this.okta.isAuthenticated();
    if (authenticated) {return true;}
    // Redirect to login flow.
    this.okta.login(state.url);
    return false;
  }
}