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
              link: '/home/config/setuptable/region/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'market',
              name: 'Market',
              link: '/home/config/setuptable/market/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studio',
              name: 'Studio',
              link: '/home/config/setuptable/studio/search',
              icon: 'admin_panel_settings',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'channeltype',
              name: 'Channel Type',
              link: '/home/config/setuptable/channeltype/search',
              icon: 'verified',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'channel',
              name: 'Channel',
              link: '/home/config/setuptable/channel/search',
              icon: 'thumb_up',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'cabinet',
              name: 'Cabinets',
              link: '/home/config/setuptable/cabinets/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status1',
              name: 'Status1',
              link: '/home/config/setuptable/status1/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status2',
              name: 'Status2',
              link: '/home/config/setuptable/status2/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'status3',
              name: 'Status3',
              link: '/home/config/setuptable/status3/search',
              icon: 'event',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devefforttype',
              name: 'Dev Effort Type',
              link: '/home/config/setuptable/devefforttype/search',
              icon: 'lightbulb',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devcomplexity',
              name: 'Dev Complexity',
              link: '/home/config/setuptable/devcomplexity/search',
              icon: 'highlight_off',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'gravity',
              name: 'Gravity',
              link: '/home/config/setuptable/gravity/search',
              icon: 'task_alt',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devtype1',
              name: 'Dev Type1',
              link: '/home/config/setuptable/devtype1/search',
              icon: 'question_answer',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'devtype2',
              name: 'Dev Type2',
              link: '/home/config/setuptable/devtype2/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'version',
              name: 'Version',
              link: '/home/config/setuptable/version/search',
              icon: 'text_snippet',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'quarter',
              name: 'Quarter',
              link: '/home/config/setuptable/quarter/search',
              icon: 'text_snippet',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'epp_ref',
              name: 'EPP',
              link: '/home/config/setuptable/epp/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat1',
              name: 'Prodcat1',
              link: '/home/config/setuptable/prodcat1/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat2',
              name: 'Prodcat2',
              link: '/home/config/setuptable/prodcat2/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'prodcat3',
              name: 'Prodcat3',
              link: '/home/config/setuptable/prodcat3/search',
              icon: 'cloud',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'financialyear',
              name: 'Financial Year',
              link: '/home/config/setuptable/financialyear/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'pool',
              name: 'Pool',
              link: '/home/config/setuptable/pool/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'gamecomplexity',
              name: 'Game Complexity',
              link: '/home/config/setuptable/gamecomplexity/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'productgroup',
              name: 'Product Group',
              link: '/home/config/setuptable/productgroup/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'productbasket',
              name: 'Product Basket',
              link: '/home/config/setuptable/productbasket/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'emulation',
              name: 'Emulation',
              link: '/home/config/setuptable/emulation/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'denom',
              name: 'Denom',
              link: '/home/config/setuptable/denom/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'them',
              name: 'Theme',
              link: '/home/config/setuptable/theme/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'title',
              name: 'Title',
              link: '/home/config/setuptable/title/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'risk',
              name: 'Risk',
              link: '/home/config/setuptable/risk/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'viridianlaunch',
              name: 'Viridianlaunch',
              link: '/home/config/setuptable/viridianlaunch/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'videostepper',
              name: 'Video Stepper',
              link: '/home/config/setuptable/vidstep/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'flag',
              name: 'Flag',
              link: '/home/config/setuptable/flag/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studio2',
              name: 'Studio2',
              link: '/home/config/setuptable/studio2/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
            {
              modulename: 'studiotype',
              name: 'Studiotype',
              link: '/home/config/setuptable/studiotype/search',
              icon: 'room_preferences',
              type: 'SC',
              header: '0',
              permissionflag: false
            },
          ],
        },
        {
          name: 'Extra PINs Request',
          link: '/home/transaction/managepin/extrapinrequest/add',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "ExtraPin",
          functionality: "add",
          level1: [],
        },
        {
          name: 'Requested PINs',
          link: '/home/transaction/managepin/extrapinrequest/list',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "ExtraPin",
          functionality: "list",
          level1: [],
        }, {
          name: 'Manage Product Plan',
          link: '/home/transaction/managepin/list',
          icon: 'paid',
          type: 'SC',
          header: '0',
          permissionflag: false,
          modulename: "ManagePin",
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
          functionality: "list",
          level1: [],
        },
        {
          name: 'Rework Request',
          link: '/home/transaction/rework/reworkrequest/add',
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
          link: '/home/transaction/rework/reworkrequest/list',
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
          functionality: "list",
          level1: [],
        },
        {
          name: 'Blanket Pin',
          link: '/home/transaction/blanketpin/blanketpinreq/add',
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
    private masterApiService: RdMasterApiService
  ) {
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }

  ngOnChanges(event) {
    //console.log("ng on changes", event);
    setTimeout(() => {
      if (this.rolePermissionEnableFlag) {
        this.getPermissionByModule();
        this.getPermissionmpMasterByModule();
      }
    }, 700);
  }

  ngOnInit(): void {
    // console.log("side menu bar", this.permissionIN);
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "version").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionversionmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"version");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "cabinet").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissioncabinetmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"cabinet");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "channel").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionchannelmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"channel");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "channeltype").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionchanneltypemock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"channeltype");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "denom").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiondenommock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"denom");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "devcomplexity").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiondevcomplexitymock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"devcomplexity");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "devefforttype").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiondevefforttypemock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"devefforttype");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "devtype1").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiondevtype1mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"devtype1");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "devtype2").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiondevtype2mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"devtype2");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "emulation").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionemulationmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"emulation");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "epp_ref").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionepp_refmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"epp_ref");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "financialyear").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionfinancialyearmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"financialyear");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "gamecomplexity").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiongamecomplexitymock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"gamecomplexity");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "gravity").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiongravitymock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"gravity");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "market").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionmarketmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"market");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "pool").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionpoolmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"pool");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "prodcat1").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionprodcat1mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"prodcat1");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "prodcat2").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionprodcat2mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"prodcat2");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "prodcat3").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionprodcat3mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"prodcat3");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "productbasket").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionproductbasketmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"productbasket");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "productgroup").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionproductgroupmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"productgroup");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "quarter").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionquartermock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"quarter");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "region").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionregionmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"region");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "risk").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionriskmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"risk");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "status1").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstatus1mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"status1");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "status2").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstatus2mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"status2");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "status3").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstatus3mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"status3");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "studio").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstudiomock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"studio");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "them").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionthememock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"them");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "title").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissiontitlemock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"title");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "viridianlaunch").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionvirdianlaunchmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"viridianlaunch");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "studiotype").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstudiotypemock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"studiotype");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "studio2").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionstudio2mock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"studio2");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "videostepper").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionvideosteppermock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"videostepper");
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "flag").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionflagmock);
      } else {
        this.pagePermission.push(res);
      }
      this.ManagePinMasterModulePermission(this.pagePermission,this.pages,"flag");
    });
  }
  public getPermissionByModule() {
    this.pagePermission = [];
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "ExtraPin").subscribe(res => {
      // console.log("Extra PIN permission_Get_By_Module", res);
      // console.log("pages", this.pages);
      // debugger
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(environment.rolepermissionextrapinmock);
      } else {
        this.pagePermission.push(res);
      }
      this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "ManagePin").subscribe(res => {
        //  console.log("Manage PIN permission_Get_By_Module", res);
        //  console.log("pages", this.pages);
        // debugger
        if (this.rolepermissionmock == true) {
          this.pagePermission.push(environment.rolepermissionmanagepinmock);
        } else {
          this.pagePermission.push(res);
        }

        this.ManagePinModulePermission(this.pagePermission, this.pages);
        this.ExtraPinModulePermission(this.pagePermission, this.pages);
      });
    });
  }
  public ExtraPinModulePermission(permission, pages) {
    //debuggerp
    console.log("permission[y.modulename]", permission.filter(x => x.module == "ExtraPin"));
    let extraPinPermissionData = permission.filter(x => x.module == "ExtraPin")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename == "ManagePin") {
          x.submenu.forEach(y => {
            if (y.modulename == "ExtraPin" && y.functionality == "add") {
              y.permissionflag = extraPinPermissionData.isAdd;
            }
            if (y.modulename == "ExtraPin" && y.functionality == "list") {
              y.permissionflag = extraPinPermissionData.isView;
            }
          })
        }
      });
      console.log("extrapin", this.pages);
    }
  }
  public ManagePinModulePermission(permission, pages) {
    //debugger
    console.log("permission[y.modulename]", permission.filter(x => x.module == "ManagePin"));
    let managePinPermissionData = permission.filter(x => x.module == "ManagePin")[0];
    if (this.pages) {
      this.pages.forEach(x => {
        if (x.modulename == "ManagePin") {
          x.submenu.forEach(y => {
            if (y.modulename == "ManagePin" && y.functionality == "list") {
              y.permissionflag = managePinPermissionData.isView;
            }
          })
        }
      });
      console.log("managepin", this.pages);
    }
  }
  public ManagePinMasterModulePermission(permission, pages, modulename) {
    debugger
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
