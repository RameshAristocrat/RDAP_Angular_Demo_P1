import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta-auth/okta-auth-service';
import { SidenavService } from '../side-menu-bar/sidenav.service';
import * as APIindex from '../../api/apiEndpoints/apiIndex';
import { HttpClient } from '@angular/common/http';
import { RdMasterApiService } from '../../api/apiservice/masterApiService';
import { RdSpinnerService } from '../../infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {
  public onSideNavChange: boolean;
  clientheight: number;
  permissiondata: any;
  afterViewCheckedFlag:boolean;
  constructor(private _sidenavService: SidenavService, private okta: OktaAuthService,
    private masterApiService: RdMasterApiService, private spinner:RdSpinnerService) {
    this.clientheight = document.documentElement.clientHeight;
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
    this.afterViewCheckedFlag = false;
    //this.getPermissionByModule();
  }

  ngOnInit(): void {
  //this.spinner.show();
    //this.okta.logout();
    //this.getPermissionByModule();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.getPermissionByModule();
    // }, 700);
  }

  ngAfterContentInit(){
   // this.getPermissionByModule();
  }

  ngAfterViewChecked(){
    //this.getPermissionByModule();
  }

  getPermissionByModule() {
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "ExtraPin").subscribe(res => {
      console.log("permission_Get_By_Module", res);
      this.afterViewCheckedFlag = true;
      this.permissiondata = res;
    });
  }
  sideNavClose() {
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    })
  }
}
