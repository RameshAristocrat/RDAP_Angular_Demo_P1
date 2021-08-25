import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from '@material-ui/icons';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LauncherComponent } from './launcher/launcher.component';
import { DBoardComponent } from './d-board/d-board.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { OktaAuthGuard } from './okta-auth/okta-auth-guard';
import { CallbackComponent } from './callback/callback.component';

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
        path: "config",
        loadChildren: () =>
          import("../modules/configs/rdap-configs.module").then(
            (m) => m.RdapConfigModule
          ),
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
