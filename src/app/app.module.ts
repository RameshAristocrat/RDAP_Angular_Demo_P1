import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './package/core/login/login.component';
import { CoreModule } from './package/core/core.module';
import { MaterialModule } from "../app/package/mat-modules/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavService } from './package/core/side-menu-bar/sidenav.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import {
//   OktaAuthModule,
//   OktaAuthService,
//   OKTA_CONFIG,
//   OktaCallbackComponent,
//   OktaAuthGuard
// } from '@okta/okta-angular';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './package/core/home/home.component';
import { DBoardComponent } from './package/core/d-board/d-board.component';
import { RdapManagePinComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin.component';
import { RdapManagePinListComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-list/rdap-manage-pin-list.component';
import { RdapManagePinProductTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-product-tab/rdap-manage-pin-product-tab.component';
import { RdapManagePinSetItemsTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-set-items-tab/rdap-manage-pin-set-items-tab.component';
import { RdapManagePinAuditLogsTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-audit-logs-tab/rdap-manage-pin-audit-logs-tab.component';
import { RdapManagePinDependenciesTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-dependencies-tab/rdap-manage-pin-dependencies-tab.component';
import { RdapManagePinMilestoneTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-milestone-tab/rdap-manage-pin-milestone-tab.component';
import { RdapManagePinClarityComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-clarity/rdap-manage-pin-clarity.component';
import { RdapManagePinTestDetailsTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-test-details-tab/rdap-manage-pin-test-details-tab.component';
import { RdapManagePinCabinetTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-cabinet-tab/rdap-manage-pin-cabinet-tab.component';
import { RdapManagePinOthersTabComponent } from './package/modules/rdap-manage-pin/rdap-manage-pin-others-tab/rdap-manage-pin-others-tab.component';
import {
  BlockCopyPasteDirective
} from 'src/app/package/modules/rdap-shared-components/utils/block-copy-paste.directive';

//import { RdapExtraPinRequestDropdownComponent } from './package/modules/rdap-shared-components/rdap-autocomplete-shared-component/rdap-extra-pin-request-dropdown/rdap-extra-pin-request-dropdown.component';
//import { RdapSearchSharedComponent } from './package/modules/rdap-shared-components/rdap-search-shared/rdap-search-shared.component';
//import { StudioComponent } from './package/modules/configs/setup-tables/studio/studio.component';
//import { RDAPExtraPINRequestComponent } from './package/modules/rdap-extra-pin-request/rdap-extra-pin-request.component';
//import { DashboardComponent } from './package/launch-pad/components/dashboard/dashboard.component';
const oktaConfig = {
  issuer: 'https://aristocrat.okta.com',
  redirectUri: 'http://sydc-appdev-01:8080/main/launcher',
  clientId: '0oa9t7ifubUwIhATi357',
  scope: 'openid'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlockCopyPasteDirective,
    RdapManagePinComponent,
    RdapManagePinListComponent,
    RdapManagePinProductTabComponent,
    RdapManagePinSetItemsTabComponent,
    RdapManagePinAuditLogsTabComponent,
    RdapManagePinDependenciesTabComponent,
    RdapManagePinMilestoneTabComponent,
    RdapManagePinClarityComponent,
    RdapManagePinTestDetailsTabComponent,
    RdapManagePinCabinetTabComponent,
    RdapManagePinOthersTabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [SidenavService,
    //{ provide: OKTA_CONFIG, useValue: oktaConfig }
    //WorkoutService,
    //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
