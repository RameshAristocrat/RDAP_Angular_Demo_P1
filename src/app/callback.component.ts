import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from './package/core/okta-auth/okta-auth-service';

@Component({ template: `` })
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService) {}

  ngOnInit(): void {
    // Handles the response from Okta and parses tokens
  }
}