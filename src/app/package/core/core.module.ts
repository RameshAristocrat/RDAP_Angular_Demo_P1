import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CoreRoutes } from '../core/core-routing';
import { LoginFooterComponent } from './login/login-footer/login-footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuBarComponent } from './main-menu-bar/main-menu-bar.component';
import { MaterialModule } from "../mat-modules/material.module";
import{APP_BASE_HREF, CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LauncherComponent } from './launcher/launcher.component';
import { SideMenuBarComponent } from './side-menu-bar/side-menu-bar.component';
import { SidenavService } from './side-menu-bar/sidenav.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBoardComponent } from './d-board/d-board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DatatableComponent } from './components/datatable/datatable.component';
import { RdapSharedConfigSearchComponent } from './core-shared-components/rdap-shared-config-search/rdap-shared-config-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RdapSharedBreadcrumbComponent } from './core-shared-components/rdap-shared-breadcrumb/rdap-shared-breadcrumb.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { RdapSharedConfigSetuptableAddeditComponent } from './core-shared-components/rdap-shared-config-setuptable-addedit/rdap-shared-config-setuptable-addedit.component';
import { RdapSharedIgxGridSearchResultComponent } from './core-shared-components/rdap-shared-igx-grid-search-result/rdap-shared-igx-grid-search-result.component';
import { CallbackComponent } from './callback/callback.component';
import { RdapSharedConfigSetuptableViewComponent } from './core-shared-components/rdap-shared-config-setuptable-view/rdap-shared-config-setuptable-view.component';
import { RdapSharedConfigDynamicIgxGridComponent } from './core-shared-components/rdap-shared-config-setuptable-addedit/rdap-shared-config-dynamic-igx-grid/rdap-shared-config-dynamic-igx-grid.component';
import { IgxHeaderComponent } from './igx-header/igx-header.component';
import { IgxSidenavbarComponent } from './igx-sidenavbar/igx-sidenavbar.component';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG} from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    LoginFooterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuBarComponent,
    LauncherComponent,
    SideMenuBarComponent,
    DBoardComponent,
    DatatableComponent,
    RdapSharedConfigSearchComponent,
    RdapSharedBreadcrumbComponent,
    RdapSharedConfigSetuptableAddeditComponent,
    RdapSharedIgxGridSearchResultComponent,
    CallbackComponent,
    RdapSharedConfigSetuptableViewComponent,
    RdapSharedConfigDynamicIgxGridComponent,
    IgxHeaderComponent,
    IgxSidenavbarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreRoutes,
    MaterialModule,
    CommonModule, 
    MatGridListModule,
     MatCardModule, 
     MatMenuModule, 
     MatIconModule, 
     MatButtonModule, 
     LayoutModule
    ],
  exports:[
  LoginFooterComponent,
  SideMenuBarComponent,
  RdapSharedConfigSearchComponent,
  RdapSharedBreadcrumbComponent,
  RdapSharedConfigSetuptableAddeditComponent,
  RdapSharedIgxGridSearchResultComponent,
  RdapSharedConfigSetuptableViewComponent
  ],
  entryComponents:[
    RdapSharedConfigSearchComponent,
    RdapSharedBreadcrumbComponent,
    RdapSharedConfigSetuptableAddeditComponent,
    RdapSharedIgxGridSearchResultComponent,
    RdapSharedConfigSetuptableViewComponent
  ],
  // providers: [
  //   {
  //     provide: OKTA_CONFIG,
  //     useFactory: () => {
  //       const oktaAuth = new OktaAuth({
  //         clientId: environment.oktaconfig.CLIENT_ID,
  //         issuer: environment.oktaconfig.ISSUER,
  //         redirectUri: environment.oktaconfig.LOGIN_REDIRECT_URI,
  //         scopes: ['openid', 'profile', 'email'],
  //       },
  //         );
  //       return {
  //         oktaAuth,
  //         onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
  //           const router = injector.get(Router);
  //           // Redirect the user to your custom login page
  //           router.navigate(['/login']);
  //         }
  //       }
  //     }
  //   },
  //   { provide: APP_BASE_HREF, useValue: '/' },
  // ],
  bootstrap: []
})
export class CoreModule { 

}
