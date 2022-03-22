import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animateText, onSideNavChange } from '../animation/animation';
import { SidenavService } from './sidenav.service';
import * as APIindex from '../../api/apiEndpoints/apiIndex';
import { HttpClient } from '@angular/common/http';
import { RdMasterApiService } from '../../api/apiservice/masterApiService';
import { RdSpinnerService } from '../../infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
import { environment } from "src/environments/environment";
import * as rolePermossionMock from '../../../../assets/config/rolePermissionMockData';
import { CommonService } from '../../api/commonservice/common.service';
interface Page {
  link: string;
  name: string;
  icon: string;
  type: string;
  header: string;
  modulename: string;
  submenu: SubPage[];
}
interface SubPage {
  link: string;
  name: string;
  icon: string;
  type: string;
  header: string;
  permissionflag: boolean;
  modulename: string;
  functionality: string;
  level1: Level1[];
}
interface Level1 {
  link: string;
  name: string;
  icon: string;
  type: string;
  header: string;
  permissionflag: boolean;
  modulename: string;
}
@Component({
  selector: 'app-side-menu-bar',
  templateUrl: './side-menu-bar.component.html',
  styleUrls: ['./side-menu-bar.component.scss'],
  animations: [onSideNavChange, animateText],
})
export class SideMenuBarComponent implements OnInit, OnChanges {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public getPermissionByModule_Var: any;
  @Input() permissionIN: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  public pages: Page[] = [
    {
      name: 'Manage PIN',
      link: 'some-link',
      icon: 'lock',
      type: 'P',
      header: '0',
      modulename: "ManagePin",
      submenu: [
        {
          name: 'Master',
          link: 'some-link',
          icon: 'cloud',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "ManagePinMaster",
          functionality: "all",
          level1: [
            {
              modulename: 'region',
              name: 'Region',
              link: '/home/managepin/master/region/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'market',
              name: 'Market',
              link: '/home/managepin/master/market/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studio',
              name: 'Studio',
              link: '/home/managepin/master/studio/search',
              icon: 'admin_panel_settings',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'channeltype',
              name: 'Channel Type',
              link: '/home/managepin/master/channeltype/search',
              icon: 'verified',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'channel',
              name: 'Channel',
              link: '/home/managepin/master/channel/search',
              icon: 'thumb_up',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'cabinet',
              name: 'Cabinets',
              link: '/home/managepin/master/cabinets/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status1',
              name: 'Status1',
              link: '/home/managepin/master/status1/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status2',
              name: 'Status2',
              link: '/home/managepin/master/status2/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status3',
              name: 'Status3',
              link: '/home/managepin/master/status3/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devefforttype',
              name: 'Dev Effort Type',
              link: '/home/managepin/master/devefforttype/search',
              icon: 'lightbulb',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devcomplexity',
              name: 'Dev Complexity',
              link: '/home/managepin/master/devcomplexity/search',
              icon: 'highlight_off',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'gravity',
              name: 'Gravity',
              link: '/home/managepin/master/gravity/search',
              icon: 'task_alt',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devtype1',
              name: 'Dev Type1',
              link: '/home/managepin/master/devtype1/search',
              icon: 'question_answer',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devtype2',
              name: 'Dev Type2',
              link: '/home/managepin/master/devtype2/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'version',
              name: 'Version',
              link: '/home/managepin/master/version/search',
              icon: 'text_snippet',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'quarter',
              name: 'Quarter',
              link: '/home/managepin/master/quarter/search',
              icon: 'text_snippet',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'epp_ref',
              name: 'EPP',
              link: '/home/managepin/master/epp/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat1',
              name: 'Prodcat1',
              link: '/home/managepin/master/prodcat1/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat2',
              name: 'Prodcat2',
              link: '/home/managepin/master/prodcat2/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat3',
              name: 'Prodcat3',
              link: '/home/managepin/master/prodcat3/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'financialyear',
              name: 'Financial Year',
              link: '/home/managepin/master/financialyear/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'pool',
              name: 'Pool',
              link: '/home/managepin/master/pool/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'gamecomplexity',
              name: 'Game Complexity',
              link: '/home/managepin/master/gamecomplexity/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'productgroup',
              name: 'Product Group',
              link: '/home/managepin/master/productgroup/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'productbasket',
              name: 'Product Basket',
              link: '/home/managepin/master/productbasket/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'emulation',
              name: 'Emulation',
              link: '/home/managepin/master/emulation/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'denom',
              name: 'Denom',
              link: '/home/managepin/master/denom/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'theme',
              name: 'Theme',
              link: '/home/managepin/master/theme/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'title',
              name: 'Title',
              link: '/home/managepin/master/title/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'risk',
              name: 'Risk',
              link: '/home/managepin/master/risk/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'viridianlaunch',
              name: 'Viridianlaunch',
              link: '/home/managepin/master/viridianlaunch/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'videostepper',
              name: 'Video Stepper',
              link: '/home/managepin/master/vidstep/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'flag',
              name: 'Flag',
              link: '/home/managepin/master/flag/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studio2',
              name: 'Studio2',
              link: '/home/managepin/master/studio2/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studiotype',
              name: 'Studiotype',
              link: '/home/managepin/master/studiotype/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },{
              modulename: 'platform',
              name: 'platform',
              link: '/home/managepin/master/platform/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            }
          ],
        },
        {
          name: 'Extra PINs Request',
          link: '/home/managepin/extrapinrequest/add',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "extrapin",
          functionality: "add",
          level1: [],
        },
        {
          name: 'Requested PINs',
          link: '/home/managepin/extrapinrequest/list',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "extrapin",
          functionality: "list",
          level1: [],
        }, {
          name: 'Manage Product Plan',
          link: '/home/managepin/manageproductplan/list',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "managepin",
          functionality: "list",
          level1: [],
        }, {
          name: 'Workflow',
          link: '/home/transaction/managepin/extrapinrequest/workflow/view',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "Workflow",
          functionality: "view",
          level1: [],
        }
      ],
    },
    {
      name: 'Rework',
      link: 'some-link',
      icon: 'all_inclusive',
      type: 'P',
      header: '0',
      modulename: "Rework",
      submenu: [
        {
          name: 'Master',
          link: 'some-link',
          icon: 'work',
          type: 'C',
          header: '0',
          permissionflag: false,
          modulename: "Rework",
          functionality: "all",
          level1: [],
        },
        {
          name: 'Rework Request',
          link: '/home/rework/reworkrequest/add',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "Rework",
          functionality: "add",
          level1: [],
        },
        {
          name: 'Requested Rework',
          link: '/home/rework/reworkrequest/list',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "Rework",
          functionality: "list",
          level1: [],
        },
      ],
    },
    {
      name: 'Blanket Pin',
      link: 'some-link',
      icon: 'all_inclusive',
      type: 'P',
      header: '0',
      modulename: "BlanketPin",
      submenu: [
        {
          name: 'Master',
          link: 'some-link',
          icon: 'work',
          type: 'C',
          header: '0',
          permissionflag: false,
          modulename: "Master",
          functionality: "all",
          level1: [],
        },
        {
          name: 'Blanket Pin Request',
          link: '/home/blanketpin/blanketpinreq/add',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "BlanketPin",
          functionality: "add",
          level1: [],
        }
      ],
    },
    {
      name: 'User Authorization',
      link: 'some-link',
      icon: 'supervised_user_circle',
      type: 'P',
      header: '0',
      modulename: "UserAuthorization",
      submenu: [],
    },
    {
      name: 'Auditing ',
      link: 'some-link',
      icon: 'admin_panel_settings',
      type: 'P',
      header: '0',
      modulename: "Auditing",
      submenu: [],
    },
    {
      name: 'System Setup',
      link: 'some-link',
      icon: 'phonelink_setup',
      type: 'P',
      header: '0',
      modulename: "SystemSetup",
      submenu: [],
    },
  ];
  constructor(
    private _sidenavService: SidenavService,
    private _router: Router,
    private masterApiService: RdMasterApiService,
    
  ) {
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }

  ngOnChanges(event) {
  }

  ngOnInit(): void {
    if (this.rolePermissionEnableFlag) {
      this.getSideMenuPermission()
    }
  }
  public setPermissiion(permission){
    permission.forEach(pagePermission => {
      if(pagePermission.module == "version" || pagePermission.module == "cabinet" || pagePermission.module == "channel"
        || pagePermission.module == "channeltype" || pagePermission.module == "denom" || pagePermission.module == "devcomplexity"
        || pagePermission.module == "devefforttype" || pagePermission.module == "devtype1" || pagePermission.module == "devtype2"
        || pagePermission.module == "emulation" || pagePermission.module == "epp_ref" || pagePermission.module == "financialyear"
        || pagePermission.module == "gamecomplexity" || pagePermission.module == "gravity" || pagePermission.module == "market"
        || pagePermission.module == "pool" || pagePermission.module == "prodcat1" || pagePermission.module == "prodcat2"
        || pagePermission.module == "productbasket" || pagePermission.module == "productgroup" || pagePermission.module == "prodcat3"
        || pagePermission.module == "quarter" || pagePermission.module == "region" || pagePermission.module == "risk"
        || pagePermission.module == "status1" || pagePermission.module == "status2" || pagePermission.module == "status3"
        || pagePermission.module == "studio" || pagePermission.module == "theme" || pagePermission.module == "title"
        || pagePermission.module == "viridianlaunch" || pagePermission.module == "platform" || pagePermission.module == "flag"
        || pagePermission.module == "studiotype" || pagePermission.module == "studio2" || pagePermission.module == "videostepper"
        ){
          this.ManagePinMasterModulePermission(this.pagePermission,this.pages, pagePermission.module);
        }
        else if(pagePermission.module == 'extrapin'){
          this.ExtraPinModulePermission(this.pagePermission, this.pages);
        }
        else if(pagePermission.module == 'managepin'){
          this.ManagePinModulePermission(this.pagePermission, this.pages);
        }
        else if(pagePermission.module == 'workflow'){
          this.ManagePinWorkflowModulePermission(this.pagePermission, this.pages);
        }
        else if(pagePermission.module == 'blanketpin'){
          this.blanketPinModulePermission(this.pagePermission, this.pages);
        }
      else if( pagePermission.module == 'rework'){
          this.reworkModulePermission(this.pagePermission, this.pages);
      }
    })
  }

  public getSideMenuPermission(){
    this.masterApiService.getPermissionSideMenu(APIindex.API.permission_side_menu).subscribe(res => {
      if (res) {
        this.pagePermission = res;
        this.setPermissiion(this.pagePermission)
      }
    });
  }
 
  public ExtraPinModulePermission(permission, pages) {
    let extraPinPermissionData = permission.filter(x => x.module.toLowerCase() == "extrapin")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "managepin") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "extrapin" && y.functionality == "add") {
              y.permissionflag = extraPinPermissionData.isAdd;
            }
            if (y.modulename.toLowerCase() == "extrapin" && y.functionality == "list") {
              y.permissionflag = extraPinPermissionData.isView;
            }
          })
        }
      });
    }
  }
  public ManagePinModulePermission(permission, pages) {
    //debugger
    let managePinPermissionData = permission.filter(x => x.module.toLowerCase() == "managepin")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "managepin") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "managepin" && y.functionality == "list") {
              y.permissionflag = managePinPermissionData.isView;
            }
          })
        }
      });
    }
  }
  public ManagePinWorkflowModulePermission(permission, pages) {
    //debugger
    //console.log("permission[y.modulename]", permission.filter(x => x.module.toLowerCase() == "managepin"));
    let managePinWorkflowPermissionData = permission.filter(x => x.module.toLowerCase() == "workflow")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "managepin") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "workflow" && y.functionality == "view") {
              y.permissionflag = managePinWorkflowPermissionData.isView;
            }
          })
        }
      });
    }
  }
  public blanketPinModulePermission(permission, pages) {
    //debugger
    //console.log("permission[y.modulename]", permission.filter(x => x.module.toLowerCase() == "managepin"));
    let managePinWorkflowPermissionData = permission.filter(x => x.module.toLowerCase() == "blanketpin")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "blanketpin") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "blanketpin" && y.functionality == "add") {
              y.permissionflag = managePinWorkflowPermissionData.isAdd
            }
            if (y.modulename.toLowerCase() == "blanketpin" && y.functionality == "list") {
              y.permissionflag = managePinWorkflowPermissionData.isView            }
          })
        }
      });
    }
  }
  public reworkModulePermission(permission, pages) {
    //debugger
    //console.log("permission[y.modulename]", permission.filter(x => x.module.toLowerCase() == "managepin"));
    let reworkPermissionData = permission.filter(x => x.module.toLowerCase() == "rework")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "rework") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "rework" && y.functionality == "add") {
              y.permissionflag = reworkPermissionData.isAdd;
            }
            if (y.modulename.toLowerCase() == "rework" && y.functionality == "list") {
              y.permissionflag = reworkPermissionData.isView;
            }
          })
        }
      });
    }
  }
  public ManagePinMasterModulePermission(permission, pages, modulename) {
    let managePinMasterPermissionData = permission.filter(x => x.module.toLowerCase() == modulename)[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename.toLowerCase() == "managepin") {
          x.submenu.forEach(y => {
            if (y.modulename.toLowerCase() == "managepinmaster" && y.functionality == "all") {
              y.level1.forEach(z=>{
                if(z.modulename.toLowerCase() == modulename){
                  z.permissionflag = managePinMasterPermissionData.isView;
                }
              });
            }
          })
        }
      });
    }
  }
  onSinenavToggle() {
    this.sideNavState = true;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
  onSidenavToggleOver() {
    this.sideNavState = true;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
  onSidenavToggleOut() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
  async navlistRedirect(url) {
    await this._router.navigateByUrl(url);
  }
}
