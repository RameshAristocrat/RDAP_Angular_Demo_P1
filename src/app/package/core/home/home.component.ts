import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta-auth/okta-auth-service';
import { SidenavService } from '../side-menu-bar/sidenav.service';
import * as APIindex from '../../api/apiEndpoints/apiIndex';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RdMasterApiService } from '../../api/apiservice/masterApiService';
import { RdSpinnerService } from '../../infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../api/commonservice/common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public onSideNavChange: boolean;
  clientheight: number;
  permissiondata: any;
  oktaIdToken: string= '';
  afterViewCheckedFlag:boolean;
  constructor(private _sidenavService: SidenavService, private okta: OktaAuthService, private commonService: CommonService,
    private masterApiService: RdMasterApiService, private spinner:RdSpinnerService, private router: Router) {
    this.clientheight = document.documentElement.clientHeight;
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
    this.afterViewCheckedFlag = false;
  }

  ngOnInit(): void {
    let idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
    if(idToken != null){
      this.oktaIdToken = idToken.idToken;
    }
    else{
      this.commonService.getOktaAuthToken().subscribe(res =>{
        if(res){
          this.oktaIdToken = res.idToken;
        }
      })
    }
    
    this.okta.handleAuthentication();
  }
  sideNavClose() {
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    })
  }
}
