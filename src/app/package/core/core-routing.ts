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
import { RdapExtPinReqListComponent } from '../modules/rdap-extra-pin-request/rdap-extra-pin-request-list/rdap-ext-pin-req-list/rdap-ext-pin-req-list.component';
import { RdapReworkReqListComponent } from '../modules/rdap-rework-request/rdap-rework-request-list/rdap-rework-request-list.component';
import { RdapManagePinComponent } from '../modules/rdap-manage-pin/rdap-manage-pin.component';
import { RdapManagePinListComponent } from '../modules/rdap-manage-pin/rdap-manage-pin-list/rdap-manage-pin-list.component';
import { RdapExtraPinRequestIndividualWorkflowComponent } from '../modules/rdap-extra-pin-request/rdap-extra-pin-request-individual-workflow/rdap-extra-pin-request-individual-workflow.component';
import { RdapReworkRequestComponent } from '../modules/rdap-rework-request/rdap-rework-request.component';
import { OktaAuthRefreshGuard } from './okta-auth/okta-auth-refresh-guard';
import { RdapBlanketPinDetailsComponent } from '../modules/rdap-blanketpin-request/rdap-blanketpin-details/rdap-blanketpin-details.component';
import { RdapBlanketPinRequestComponent } from '../modules/rdap-blanketpin-request/rdap-blanketpin-request.component';


const routes: Routes = [
  {
    path: "callback",
    component: CallbackComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivateChild:[OktaAuthRefreshGuard],
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
        path: "reworkrequest",
        loadChildren: () =>
          import("../modules/rdap-rework-request/rdap-rework-request.module").then(
            (m) => m.RdapReworkRequestModule
          ),
      },
      {
        path: "blanketpinreq",
        loadChildren: () =>
          import("../modules/rdap-blanketpin-request/rdap-blanketpin-request.module").then(
            (m) => m.RdapBlanketpinRequestModule
          ),
      },
      
      {
        path: "configold",
        loadChildren: () =>
          import("../modules/configs/rdap-configs.module").then(
            (m) => m.RdapConfigModule
          ),
      }, {
        path: "managepin/master",
        component: SetupTableHomeComponent,
        children: [
          {
            path: "region",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          }, {
            path: "market",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          }, {
            path: "studio",
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'channeltype',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'channel',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'cabinets',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'devefforttype',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'status1',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'status2',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'status3',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'prodcat1',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'prodcat2',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'prodcat3',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'studio',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'pool',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'gamecomplexity',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'gravity',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'financialyear',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'quarter',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'devcomplexity',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'productbasket',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'productgroup',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          }, {
            path: "devtype1",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          }, {
            path: "devtype2",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          }, {
            path: "version",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          }, {
            path: "epp",
            //component: RdapConfigCommonSearchComponent,
            children: [{
              path: "search",
              component: RdapConfigCommonSearchComponent,
            }, {
              path: "add",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "edit",
              component: RdapConfigCommonAddEditComponent,
            }, {
              path: "view",
              component: RdapConfigCommonAddEditComponent,
            }]
          },
          {
            path: 'theme',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'title',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'risk',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'viridianlaunch',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'emulation',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'denom',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'studio2',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'studiotype',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
	   {
            path: 'vidstep',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
          {
            path: 'flag',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },{
            path: 'platform',
            //component: RdapConfigCommonSearchComponent,
            children: [
              {
                path: 'search',
                component: RdapConfigCommonSearchComponent,
              },
              {
                path: 'add',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'edit',
                component: RdapConfigCommonAddEditComponent,
              },
              {
                path: 'view',
                component: RdapConfigCommonAddEditComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'managepin/extrapinrequest/add',
        component: RDAPExtraPINRequestComponent,
      }, {
        path: 'managepin/extrapinrequest/list',
        component: RdapExtPinReqListComponent,
      },
      {
        path: 'managepin/extrapinrequest/view/:id',
        component: RDAPExtraPINRequestComponent,
      },
      {
        path: 'transaction/managepin/extrapinrequest/workflow',
        component: RDAPExtraPINRequestComponent,
      },
      {
        path: 'managepin/manageproductplan/view/:id',
        component: RdapManagePinComponent,
      },
      {
        path: 'managepin/manageproductplan/list',
        component: RdapManagePinListComponent,
      },
      {
        path: 'transaction/managepin/extrapinrequest/workflow/view',
        component:RdapExtraPinRequestIndividualWorkflowComponent,
      }
      ,{
        path: 'rework/reworkrequest/add',
        component: RdapReworkRequestComponent,
      }, {
        path: 'rework/reworkrequest/list',
        component: RdapReworkReqListComponent,
      },
      {
        path: 'rework/reworkrequest/view/:id',
        component: RdapReworkRequestComponent,
      },
      {
        path: 'rework/reworkrequest/workflow',
        component: RdapReworkRequestComponent,
      }
      ,{
        path: 'blanketpin/blanketpinreq/add',
        component: RdapBlanketPinRequestComponent,
      },
    ],
  },
  {
    path: 'tool',
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
