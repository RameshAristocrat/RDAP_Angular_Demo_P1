import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta-auth/okta-auth-service';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss']
})
export class LauncherComponent implements OnInit {

  constructor(private okta: OktaAuthService) { }

  ngOnInit(): void {
    this.okta.handleAuthentication();
  }

}
