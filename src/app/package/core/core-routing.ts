import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from '@material-ui/icons';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LauncherComponent } from './launcher/launcher.component';
import { DBoardComponent } from './d-board/d-board.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { OktaAuthGuard } from './okta-auth/okta-auth-guard';
import { CallbackComponent } from './callback/callback.component';
import { SetupTableHomeComponent } from '../modules/configs/setup-tables/setup-table-home/setup-table-home.component';
import { RdapConfigCommonAddEditComponent } from '../modules/configs/setup-tables/rdap-config-common-add-edit/rdap-config-common-add-edit.component';
import { RdapConfigCommonSearchComponent } from '../modules/configs/setup-tables/rdap-config-common-search/rdap-config-common-search.component';
import { RdapConfigCommonViewComponent } from '../modules/configs/setup-tables/rdap-config-common-view/rdap-config-common-view.component';
import { RDAPExtraPINRequestComponent } from '../modules/rdap-extra-pin-request/rdap-extra-pin-request.component';

const routes: Routes = [
  {
    path: "callback",
    component: CallbackComponent,
    canActivate:[OktaAuthGuard]
  },
{
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DBoardComponent
      },
      {
        path: "expinreq",
        loadChildren: () =>
          import("../modules/rdap-extra-pin-request/rdap_extra_pin_request.module").then(
            (m) => m.RdapExtraPinRequestModule
          ),
      },
      {
        path: "configold",
        loadChildren: () =>
          import("../modules/configs/rdap-configs.module").then(
            (m) => m.RdapConfigModule
          ),
      },{
        path: "config/setuptable",
        component: SetupTableHomeComponent,
        children: [
            {
                path: "region",
                //component: RdapConfigCommonSearchComponent,
                children:[{
                    path: "search",
                component: RdapConfigCommonSearchComponent,
                },{
                    path: "add",
                component: RdapConfigCommonAddEditComponent,
                },{
                  path: "edit",
              component: RdapConfigCommonAddEditComponent,
              },{
                  path: "view",
              component: RdapConfigCommonAddEditComponent,
              }]
            },{
              path: "market",
              //component: RdapConfigCommonSearchComponent,
              children:[{
                  path: "search",
              component: RdapConfigCommonSearchComponent,
              },{
                  path: "add",
              component: RdapConfigCommonAddEditComponent,
              },{
                  path: "edit",
              component: RdapConfigCommonAddEditComponent,
              },{
                path: "view",
            component: RdapConfigCommonAddEditComponent,
            }]
          },{
            path: "studio",
            //component: RdapConfigCommonSearchComponent,
            children:[{
                path: "search",
            component: RdapConfigCommonSearchComponent,
            },{
                path: "add",
            component: RdapConfigCommonAddEditComponent,
            },{
                path: "edit",
            component: RdapConfigCommonAddEditComponent,
            },{
              path: "view",
          component: RdapConfigCommonAddEditComponent,
          }]
        },{
          path: "channeltype",
          //component: RdapConfigCommonSearchComponent,
          children:[{
              path: "search",
          component: RdapConfigCommonSearchComponent,
          },{
              path: "add",
          component: RdapConfigCommonAddEditComponent,
          },{
              path: "edit",
          component: RdapConfigCommonAddEditComponent,
          },{
            path: "view",
        component: RdapConfigCommonAddEditComponent,
        }]
      },{
        path: "channel",
        //component: RdapConfigCommonSearchComponent,
        children:[{
            path: "search",
        component: RdapConfigCommonSearchComponent,
        },{
            path: "add",
        component: RdapConfigCommonAddEditComponent,
        },{
            path: "edit",
        component: RdapConfigCommonAddEditComponent,
        },{
          path: "view",
      component: RdapConfigCommonAddEditComponent,
      }]
    },{
      path: "cabinets",
      //component: RdapConfigCommonSearchComponent,
      children:[{
          path: "search",
      component: RdapConfigCommonSearchComponent,
      },{
          path: "add",
      component: RdapConfigCommonAddEditComponent,
      },{
          path: "edit",
      component: RdapConfigCommonAddEditComponent,
      },{
        path: "view",
    component: RdapConfigCommonAddEditComponent,
    }]
  },{
    path: "devefforttype",
    //component: RdapConfigCommonSearchComponent,
    children:[{
        path: "search",
    component: RdapConfigCommonSearchComponent,
    },{
        path: "add",
    component: RdapConfigCommonAddEditComponent,
    },{
        path: "edit",
    component: RdapConfigCommonAddEditComponent,
    },{
      path: "view",
  component: RdapConfigCommonAddEditComponent,
  }]
},{
  path: "devcomplexity",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "status1",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "status2",
  //component: RdapConfigCommonSearchComponent,
  children:[{
    path: "search",
component: RdapConfigCommonSearchComponent,
},{
    path: "add",
component: RdapConfigCommonAddEditComponent,
},{
    path: "edit",
component: RdapConfigCommonAddEditComponent,
},{
  path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "status3",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "gravity",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "prodcat1",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "prodcat2",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
},{
  path: "prodcat3",
  //component: RdapConfigCommonSearchComponent,
  children:[{
      path: "search",
  component: RdapConfigCommonSearchComponent,
  },{
      path: "add",
  component: RdapConfigCommonAddEditComponent,
  },{
      path: "edit",
  component: RdapConfigCommonAddEditComponent,
  },{
    path: "view",
component: RdapConfigCommonAddEditComponent,
}]
}]
      },{
        path: "transaction/managepin/extrapinrequest",
        component:RDAPExtraPINRequestComponent,
      }]
  }, {
    path: "tool",
    component: HomeComponent,
    children: [
      {
        path: "datatable",
        component: DatatableComponent,
      }]
  },
  // {
  //   path: "main",
  //   component: HomeComponent,
  //   children: [
  //     {
  //       path: "launcher",
  //       loadChildren: () =>
  //         import("../launch-pad/launch-pad.module").then(
  //           (m) => m.LaunchPadModule
  //         ),
  //     }]
  // }
];
export const CoreRoutes = RouterModule.forChild(routes);
