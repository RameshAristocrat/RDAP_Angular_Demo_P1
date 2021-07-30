import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta-auth/okta-auth-service';
import { SidenavService } from '../side-menu-bar/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public onSideNavChange: boolean;
  constructor(private _sidenavService: SidenavService,private okta: OktaAuthService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
   }

  ngOnInit(): void {
 
  }
  sideNavClose(){
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log("sideNavClose",res)
      this.onSideNavChange = res;
    })
  }
}
