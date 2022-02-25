import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent, IgxExcelExporterService } from '@infragistics/igniteui-angular';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { environment } from "src/environments/environment";
import { Location } from '@angular/common';
import { SettingsRemote } from '@material-ui/icons';
import * as rolePermossionMockJs from '../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../api/apiEndpoints/apiIndex';
@Component({
  selector: 'app-rdap-manage-pin',
  templateUrl: './rdap-manage-pin.component.html',
  styleUrls: ['./rdap-manage-pin.component.scss']
})
export class RdapManagePinComponent implements OnInit, OnChanges {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  tabAlignment: any;
  tabname: any;
  tabid: any;
  message: any;
  testerdetailsParam = {
    planitem: 0,
    testers: []
  };
  setitemParam = {
    planitem: 0,
    setItems: []
  };
  productParam = {
    versionId: 0,
    channelId: 0,
    channeltypeId: 0,
    regionId: 0,
    marketId: 0,
    studioId: 0,
    devtype2Id: 0,
    description: "",
    titleId: 0,
    themeId: 0,
    platform2Id: 0,
    prodcat3Id: 0,
    sequenceId: 0,
    productbasketId: 0,
    vidstepId: 0,
    projectref: "",
    levelId: 0,
    priorityId: 0,
    showId: 0,
    revenue: 0,
    riskId: 0,
    status3Id: 0,
    cvlIts: 0,
    eqUnits: 0,
    eppRefId: 0,
    denomId: 0,
    programno: "",
    cvlPriorityId: 0,
    viridianlaunchId: 0,
    releaseNotes: "",
    marketPriority: "",
    notesCc: "",
    auditTrail: "",
    notesShort: "",
    notesLong: "",
    gamecomplexityId: 0,
    financialyearId: 0,
    quarterId: 0,
    archType: ""
  };
  milestoneParam = {
    planApprDate: "",
    gdbReqdDate: "",
    tgtDevStartDate: "",
    estDevStartDate: "",
    devStartDate: "",
    intoGigDate: "",
    presubDate: "",
    tgtIntoCvlDate: "",
    estIntoCvlDate: "",
    intoCvlDate: "",
    estPresubDate: "",
    tgtIntoSubDate: "",
    estIntoSubDate: "",
    intoSubDate: "",
    tgtSubDate: "",
    estSubDate: "",
    subDate: "",
    estRecDate: "",
    recDate: "",
    tgtApprDate: "",
    estApprDate: "",
    apprDate: "",
    tgtReleaseDate: "",
    estReleaseDate: "",
    releaseDate: ""
  };
  clarityParam = {
    projectCode: null,
    name: null,
    fullName: null,
    aliPlanitem: 0,
    isActive: 0,
    actuals: 0,
    aliGdbRemarks: null,
    description: null,
    scheduleStart: null
  };
  cabinetParam = {
    planitem: 0,
    cabinetIds: []
  }
  dependencyParam = {
    planitem: 0,
    dependencies: []
  }
  linkedpinParam = {
    planitem: 0,
    linkedPins: []
  }
  impacpinParam = {
    planitem: 0,
    impactedPins: []
  }
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  setitemInput: { planitem: null, savedata: null };
  dependencyInput: { planitem: null, savedata: null };
  testdetailsInput: { planitem: null, savedata: null };
  viewExtrapinRequestData: any;
  saveflag: boolean = false;
  productFlag: any;
  milestoneFlag: any;
  dependencyFlag: any;
  cabinetFlag: any;
  testerPlanFlag: any;
  setItemFlag: any;
  linkedPinFlag: any;
  impactedPinFlag: any;
  clarityFlag: any;
  tempjoin: any;
  debuggerflag: boolean;
  emitData: { data: any, flag: boolean };
  managepin: any;
  mpproductPermission: any;
  mpdependencyPermission: any;
  mpmilestonePermission: any;
  mpcabinetPermission: any;
  mptesterPermission: any;
  mpsetitemPermission: any;
  mplinkedPermission: any;
  mpimpactedPermission: any;
  mpauditPermission: any;
  mpclarityPermission: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  constructor(private httpClient: HttpClient, public cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.debuggerflag = environment.debuggerflag;
    if (this.location.path() != '') {
      this.route = this.location.path();
      this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      this.pinId = this.route.split('/').pop();
      if (this.pinId) {
        this.getRequestPinById();
      }
    }
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpproductPermission= [];
    this.mpdependencyPermission= [];
    this.mpmilestonePermission= [];
    this.mpcabinetPermission= [];
    this.mptesterPermission= [];
    this.mpsetitemPermission= [];
    this.mplinkedPermission= [];
    this.mpimpactedPermission= [];
    this.mpauditPermission= [];
    this.mpclarityPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpproduct").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionproductmock);
        this.mpproductPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionproductmock;
      } else {
        this.pagePermission.push(res);
        this.mpproductPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpdependency").subscribe(res => {
      if (this.rolepermissionmock == true) {
       // rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpdependency");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiondependencymock);
        this.mpdependencyPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiondependencymock;
      } else {
        this.pagePermission.push(res);
        this.mpdependencyPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpcabinet").subscribe(res => {
      if (this.rolepermissionmock == true) {
        //rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpcabinet");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissioncabinetmock);
        this.mpcabinetPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissioncabinetmock;
      } else {
        this.pagePermission.push(res);
        this.mpcabinetPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpmilestone").subscribe(res => {
      if (this.rolepermissionmock == true) {
       // rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpmilestone");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionmilestonemock);
        this.mpmilestonePermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionmilestonemock
      } else {
        this.pagePermission.push(res);
        this.mpmilestonePermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mplinked").subscribe(res => {
      if (this.rolepermissionmock == true) {
        //rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mplinked");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionlinkedpinmock);
        this.mplinkedPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionlinkedpinmock
      } else {
        this.pagePermission.push(res);
        this.mplinkedPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpimpacted").subscribe(res => {
      if (this.rolepermissionmock == true) {
       // rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpimpacted");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionimpactedpinmock);
        this.mpimpactedPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionimpactedpinmock
      } else {
        this.pagePermission.push(res);
        this.mpimpactedPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpsetitem").subscribe(res => {
      if (this.rolepermissionmock == true) {
       // rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpsetitem");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionsetitemmock);
        this.mpsetitemPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionsetitemmock
      } else {
        this.pagePermission.push(res);
        this.mpsetitemPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mptester").subscribe(res => {
      if (this.rolepermissionmock == true) {
       // rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mptester");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiontesterplanmock);
        this.mptesterPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiontesterplanmock
      } else {
        this.pagePermission.push(res);
        this.mptesterPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpclarity").subscribe(res => {
      if (this.rolepermissionmock == true) {
        //rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpclarity");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionclaritymock);
        this.mpclarityPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionclaritymock
      } else {
        this.pagePermission.push(res);
        this.mpclarityPermission = res;
      }
    });
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpaudit").subscribe(res => {
      if (this.rolepermissionmock == true) {
      //  rolePermissionMockData =  rolePermossionMpMaster.rdapRolePermossionMockMaster.filter(x=>x.modulename.toLowerCase() == "mpaudit");
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionauditlogmock);
        this.mpauditPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionauditlogmock
      } else {
        this.pagePermission.push(res);
        this.mpauditPermission = res;
      }
    });
  }
  ngOnInit(): void {
    this.getPermissionmpMasterByModule();
    this.tabid = 0;
    this.tabname = "product";
    this.tabAlignment = "left";
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPermissionmpMasterByModule();
  }

  getRequestPinById() {
    this.setitemInput = { planitem: null, savedata: null };
    this.dependencyInput = { planitem: null, savedata: null };
    this.testdetailsInput = { planitem: null, savedata: null };
    this.spinner.show();
    this.masterApiService.getRequestPinById(this.extraPinAPi + "managepin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.setitemInput = { planitem: data, savedata: null }
      this.dependencyInput = { planitem: data, savedata: null };
      this.testdetailsInput = { planitem: data, savedata: null };
      //this.viewExtrapinRequestForm();
      this.spinner.hide();
    });
  }

  tabChange(event) {
    if (event == 0) {
      this.tabid = 0;
      this.tabname = "Product";
    } else if (event == 1) {
      this.tabid = 1;
      this.tabname = "Milestone";
    } else if (event == 2) {
      this.tabid = 2;
      this.tabname = "Dependencies";
    } else if (event == 3) {
      this.tabid = 3;
      this.tabname = "Cabinet";
    } else if (event == 4) {
      this.tabid = 4;
      this.tabname = "Test Details";
    } else if (event == 5) {
      this.tabid = 5;
      this.tabname = "Set Item";
    } else if (event == 6) {
      this.tabid = 6;
      this.tabname = "Clarity";
    } else if (event == 7) {
      this.tabid = 7;
      this.tabname = "Additional";
    } else if (event == 8) {
      this.tabid = 8;
      this.tabname = "Audit Log"
    }
  }

  productEvent(data) {
    if (data.data != undefined) {
      this.productParam = data.data.value;
      this.productFlag = data.flag;
    }

    //this.updatemanagepin();
  }

  cabinetEvent(data) {
    this.cabinetParam.planitem = this.pinId;
    this.cabinetParam.cabinetIds = data.data;
    this.cabinetFlag = data.flag;
  }

  clarityEvent(data) {
    this.clarityParam = data.data;
    this.clarityFlag = data.flag;
  }

  milestoneEvent(data) {
    this.milestoneParam = data.data;
    this.milestoneFlag = data.flag;
  }

  testdetailsEvent(data) {
    this.testerdetailsParam.planitem = this.pinId;
    this.testerdetailsParam.testers = data.data;
    this.testerPlanFlag = data.flag;
  }
  setItemEvent(data) {
    this.setitemParam.planitem = this.pinId;
    this.setitemParam.setItems = data.data;
    this.setItemFlag = data.flag;
  }
  otherEvent(data) {
    if (data.name == "linkpinno") {
      this.linkedpinParam.planitem = this.pinId;
      this.linkedpinParam.linkedPins = data.data;
      this.linkedPinFlag = data.flag;
    }

    if (data.name == "impacpinno") {
      this.impacpinParam.planitem = this.pinId;
      this.impacpinParam.impactedPins = data.data;
      this.impactedPinFlag = data.flag;
    }
  }
  dependencyEvent(data) {
    this.dependencyParam.planitem = this.pinId;
    this.dependencyParam.dependencies = data.data;
    this.dependencyFlag = data.flag;
  }
  auditlogEvent(data) {

  }
  onDialogSubmit(event) {
    event.dialog.close();
    this.getRequestPinById();
    this.saveflag = true;
    this.cdr.detectChanges();
    //this.message = this.viewrecord();
  }
  updatemanagepin() {
    this.saveflag = false;
    this.masterApiService.refreshToken();
    let productUpdateUrl = "";
    let milestoneUpdateUrl = "";
    let dependencyUrl = "";
    let cabinetUrl = "";
    let testerPlanUrl = "";
    let setItemUrl = "";
    let linkedPinUrl = "";
    let impactedPinUrl = "";
    let clarityUrl = "";
    this.spinner.show();
    if (this.productFlag == true && this.mpproductPermission.isEdit == true) {
      if (this.productParam.channelId != 0 &&
        this.productParam.channeltypeId != 0 &&
        this.productParam.regionId != 0 &&
        this.productParam.marketId != 0 &&
        this.productParam.channelId != null &&
        this.productParam.channeltypeId != null &&
        this.productParam.regionId != null &&
        this.productParam.marketId != null) {
        productUpdateUrl = this.extraPinAPi + "ManagePin/" + this.pinId;
        this.masterApiService.managePinUpdate(productUpdateUrl, this.productParam).subscribe(data => {
          this.masterApiService.debuggerLog(this.debuggerflag, "product plan Details Saved Success", data);
          if (data.isSuccess) {
            this.productFlag = false;
            this.notificationAlert.open();
            this.message = data.message;
          }
          if (!data.isSuccess) {
            this.notificationAlert.open();
            this.message = data.message;
          }
        });
      } else {
        if (this.productParam.channelId == 0 ||
          this.productParam.channelId == null) {
          this.notificationAlert.open();
          this.message = "Channel is Required!!";
        } else if (this.productParam.channeltypeId == 0 ||
          this.productParam.channeltypeId == null) {
          this.notificationAlert.open();
          this.message = "Channel Type is Required!!";
        } else if (this.productParam.regionId == 0 ||
          this.productParam.regionId == null) {
          this.notificationAlert.open();
          this.message = "Region is Required!!";
        } else if (this.productParam.marketId == 0 ||
          this.productParam.marketId == null) {
          this.notificationAlert.open();
          this.message = "Market is Required!!";
        }
      }

    }
    if (this.milestoneFlag == true && this.mpmilestonePermission.isEdit == true) {
      milestoneUpdateUrl = this.extraPinAPi + "PinMilestone/" + this.pinId;
      this.masterApiService.managePinUpdate(milestoneUpdateUrl, this.milestoneParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "milestone Details Saved Success", data);
        if (data.isSuccess) {
          this.milestoneFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
    }
    if (this.dependencyFlag == true && this.mpdependencyPermission.isEdit == true) {
      dependencyUrl = this.extraPinAPi + "Dependency/savelist";
      this.masterApiService.masterAdd(dependencyUrl, this.dependencyParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "dependenc Details Saved Success", data);
        this.dependencyInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.dependencyFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      // this.cdr.detectChanges();
    }
    if (this.cabinetFlag == true && this.mpcabinetPermission.isEdit == true) {
      cabinetUrl = this.extraPinAPi + "ManagePinCabinet/savelist";
      this.masterApiService.masterAdd(cabinetUrl, this.cabinetParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "cabinet Details Saved Success", data);
        if (data.isSuccess) {
          this.cabinetFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
    }
    if (this.testerPlanFlag == true && this.mptesterPermission.isEdit == true) {
      testerPlanUrl = this.extraPinAPi + "testerplan/savelist";
      this.masterApiService.masterAdd(testerPlanUrl, this.testerdetailsParam).subscribe(data => {
        this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        this.masterApiService.debuggerLog(this.debuggerflag, "tester plan Details Saved Success", data);
        if (data.isSuccess) {
          this.testerPlanFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      //this.cdr.detectChanges();
    }
    if (this.setItemFlag == true && this.mpsetitemPermission.isEdit == true) {
      setItemUrl = this.extraPinAPi + "ManagePinSetItem/savelist";
      this.masterApiService.masterAdd(setItemUrl, this.setitemParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "Set Item Details Saved Success", data);
        // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.setItemFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      //this.cdr.detectChanges();
    }
    if (this.linkedPinFlag == true && this.mplinkedPermission.isEdit == true) {
      linkedPinUrl = this.extraPinAPi + "LinkedPin/savelist";
      this.masterApiService.masterAdd(linkedPinUrl, this.linkedpinParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "linked Pin Details Saved Success", data);
        // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.linkedPinFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      //this.cdr.detectChanges();
    }
    if (this.impactedPinFlag == true && this.mpimpactedPermission.isEdit == true) {
      impactedPinUrl = this.extraPinAPi + "ImpactedPin/savelist";
      this.masterApiService.masterAdd(impactedPinUrl, this.impacpinParam).subscribe(data => {
        this.masterApiService.debuggerLog(this.debuggerflag, "impacted Pin Details Saved Success", data);
        // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.impactedPinFlag = false;
          this.notificationAlert.open();
          this.message = data.message;
        }
        if (!data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      //this.cdr.detectChanges();
    }
    if (this.clarityFlag == true && this.mpclarityPermission.isEdit == true) {
      if (this.clarityParam.projectCode != undefined && this.clarityParam.projectCode != null) {
        clarityUrl = this.extraPinAPi + "Clarity/" + this.clarityParam.projectCode;
        this.masterApiService.managePinUpdate(clarityUrl, this.clarityParam).subscribe(data => {
          if (data.isSuccess) {
            this.clarityFlag = false;
            this.notificationAlert.open();
            this.message = "Data saved successfully."; // data.message;
          }
          if (!data.isSuccess) {
            this.notificationAlert.open();
            this.message = data.message;
          }
        });
      }

    }
    this.spinner.hide();
  }
  updatemanagepinOld() {
    let updateUrl = "";
    this.spinner.show();
    if (this.tabid == 0) {
      updateUrl = this.extraPinAPi + "ManagePin/" + this.pinId;
      this.masterApiService.managePinUpdate(updateUrl, this.productParam).subscribe(data => {
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
    } else if (this.tabid == 1) {
      updateUrl = this.extraPinAPi + "PinMilestone/" + this.pinId;
      this.masterApiService.managePinUpdate(updateUrl, this.milestoneParam).subscribe(data => {
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });

    } else if (this.tabid == 2) {
      updateUrl = this.extraPinAPi + "Dependency/savelist";
      this.masterApiService.masterAdd(updateUrl, this.dependencyParam).subscribe(data => {
        this.dependencyInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      this.cdr.detectChanges();
    } else if (this.tabid == 3) {
      updateUrl = this.extraPinAPi + "ManagePinCabinet/savelist";
      this.masterApiService.masterAdd(updateUrl, this.cabinetParam).subscribe(data => {
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
    } else if (this.tabid == 4) {
      updateUrl = this.extraPinAPi + "testerplan/savelist";
      this.masterApiService.masterAdd(updateUrl, this.testerdetailsParam).subscribe(data => {
        this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      this.cdr.detectChanges();
    } else if (this.tabid == 5) {
      updateUrl = this.extraPinAPi + "ManagePinSetItem/savelist";
      this.masterApiService.masterAdd(updateUrl, this.setitemParam).subscribe(data => {
        //this.saveddata = data;
        this.setitemInput = { planitem: this.viewExtrapinRequestData, savedata: data }
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
      this.cdr.detectChanges();

    } else if (this.tabid == 6) {
      updateUrl = this.extraPinAPi + "Clarity/" + this.clarityParam.projectCode;
      this.masterApiService.managePinUpdate(updateUrl, this.clarityParam).subscribe(data => {
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message = data.message;
        }
      });
    } else if (this.tabid == 7) {

    } else if (this.tabid == 8) {

    }
    this.spinner.hide();
  }

  cancel() {
    let finalUrl;
    if (this.route.includes('view')) {
      this.tempjoin = this.route.split('/');
      this.tempjoin.splice(- 1, 1);
      finalUrl = this.tempjoin.join('/');
      finalUrl = "/" + finalUrl;
      finalUrl = finalUrl.replace('view', 'list');
      this.router.navigate([finalUrl]);
    }
  }
}

// this.productParam.versionId = this.productform.value.versionId;
// this.productParam.marketId = this.productform.value.marketId;
// this.productParam.studioId = this.productform.value.studioId;
// this.productParam.devtype2Id = this.productform.value.devtypeId;
// this.productParam.titleId = this.productform.value.titleId;
// this.productParam.themeId = this.productform.value.themeId;
// this.productParam.platform2Id = this.productform.value.platformId;
// this.productParam.prodcat3Id = this.productform.value.prodcatId;
// this.productParam.sequenceId = this.productform.value.sequenceId;
// this.productParam.productbasketId = this.productform.value.prodcutbasketId;
// this.productParam.vidstepId = this.productform.value.videostepperId;
// this.productParam.projectref = this.productform.value.projectrefId;
// this.productParam.priorityId = this.productform.value.versionId;
// this.productParam.showId = this.productform.value.showId;
// this.productParam.revenue = this.productform.value.revenueId;
// this.productParam.riskId = this.productform.value.riskId;
// this.productParam.status3Id = this.productform.value.statusId;
// this.productParam.eppRefId = this.productform.value.epprefId;
// this.productParam.denomId = this.productform.value.denomId;
// this.productParam.programno = this.productform.value.programno;
