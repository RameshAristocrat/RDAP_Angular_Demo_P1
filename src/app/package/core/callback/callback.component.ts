import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '../okta-auth/okta-auth-service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private _router:Router, private okta : OktaAuthService) { }

  ngOnInit(): void {
    // let tokenSessionData = JSON.parse(localStorage.getItem("okta-token-storage"));
    // if(tokenSessionData){
    //   this._router.navigate(["/home/dashboard"]);
    // }
    // Handles the response from Okta and parses tokens
    // this.okta.handleAuthentication();
  }

}
