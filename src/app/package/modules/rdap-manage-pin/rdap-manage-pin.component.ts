import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { timeStamp } from 'console';
import { MatTabGroup } from '@angular/material/tabs';
import { CommonService } from '../../api/commonservice/common.service';
import { elementType } from 'prop-types';
@Component({
  selector: 'app-rdap-manage-pin',
  templateUrl: './rdap-manage-pin.component.html',
  styleUrls: ['./rdap-manage-pin.component.scss']
})
export class RdapManagePinComponent implements OnInit, AfterViewInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('managepinTab') tabGroup: MatTabGroup;
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
    platformId: 0,
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
  isErr: boolean = false;
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
  mpproductIsViewPermissionFlag: boolean = false;
  mpdependencyIsViewPermissionFlag: boolean = false;
  mpmilestoneIsViewPermissionFlag: boolean = false;
  mpcabinetIsViewPermissionFlag: boolean = false;
  mptesterIsViewPermissionFlag: boolean = false;
  mpsetitemIsViewPermissionFlag: boolean = false;
  mplinkedIsViewPermissionFlag: boolean = false;
  mpimpactedIsViewPermissionFlag: boolean = false;
  mpauditIsViewPermissionFlag: boolean = false;
  mpclarityIsViewPermissionFlag: boolean = false;
  mpproductAPIrespFlag: boolean = false;
  mpdependencyAPIrespFlag: boolean = false;
  mpmilestoneAPIrespFlag: boolean = false;
  mpcabinetAPIrespFlag: boolean = false;
  mptesterAPIrespFlag: boolean = false;
  mpsetitemAPIrespFlag: boolean = false;
  mplinkedAPIrespFlag: boolean = false;
  mpimpactedAPIrespFlag: boolean = false;
  mpauditAPIrespFlag: boolean = false;
  mpclarityAPIrespFlag: boolean = false;
  IsManagePinAdminFlag: boolean = false;
  isTabFlag: boolean = false;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  permissionApi: any;
  isProductErr: boolean = false;
  isclarityErr: boolean = false;
  isMilestoneErr: boolean = false;
  selectedIndex:any = 0;
  isAdmin : boolean = false;
  constructor(private httpClient: HttpClient, public cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute, private commonService: CommonService) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.debuggerflag = environment.debuggerflag;
    this.permissionApi = environment.userapiurl;
    this.spinner.show();
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
  public IsManagePinAdmin() {
    this.masterApiService.checkIsManagePinAdmin(this.permissionApi + "Permission/IsManagePinAdmin").subscribe(data => {
      this.IsManagePinAdminFlag = data;
      
    });
  }
  ngAfterViewInit(){
    //this.getPermissionmpMasterByModule();
    this.selectedIndex = 0;
  }
  public getPermissionmpMasterByModule(rolePermissionMenuJson) {
    this.pagePermission = [];
    this.mpproductPermission = [];
    this.mpdependencyPermission = [];
    this.mpmilestonePermission = [];
    this.mpcabinetPermission = [];
    this.mptesterPermission = [];
    this.mpsetitemPermission = [];
    this.mplinkedPermission = [];
    this.mpimpactedPermission = [];
    this.mpauditPermission = [];
    this.mpclarityPermission = [];
    this.isTabFlag = false;
    rolePermissionMenuJson.forEach(element => {
      if(element.type == 'T'){
        if(element.module == "mpproduct"){
          this.pagePermission.push(element);
          this.mpproductPermission = element;
          if (this.isAdmin == true) {
            this.mpproductIsViewPermissionFlag = false;
          } else {
            if (this.mpproductPermission.isView == true && this.mpproductPermission.isAdd == false &&
              this.mpproductPermission.isEdit == false && this.mpproductPermission.isDelete == false) {
              this.mpproductIsViewPermissionFlag = true;
            } else if (this.mpproductPermission.isView == false && this.mpproductPermission.isAdd == false &&
              this.mpproductPermission.isEdit == false && this.mpproductPermission.isDelete == false) {
              this.mpproductIsViewPermissionFlag = true;
            } else {
              this.mpproductIsViewPermissionFlag = false;
            }
          }
          this.mpproductAPIrespFlag = true;
        }
        else if(element.module == "mpdependency"){
          this.pagePermission.push(element);
          this.mpdependencyPermission = element;
          if (this.isAdmin == true) {
            this.mpdependencyIsViewPermissionFlag = false;
          } else {
            if (this.mpdependencyPermission.isView == true && this.mpdependencyPermission.isAdd == false &&
              this.mpdependencyPermission.isEdit == false && this.mpdependencyPermission.isDelete == false) {
              this.mpdependencyIsViewPermissionFlag = true;
            } else if (this.mpdependencyPermission.isView == false && this.mpdependencyPermission.isAdd == false &&
              this.mpdependencyPermission.isEdit == false && this.mpdependencyPermission.isDelete == false) {
              this.mpdependencyIsViewPermissionFlag = true;
            } else {
              this.mpdependencyIsViewPermissionFlag = false;
            }
          }
          this.mpdependencyAPIrespFlag = true;
        }
        else if(element.module == "mpcabinet"){
          this.pagePermission.push(element);
          this.mpcabinetPermission = element;
          if (this.isAdmin == true) {
            this.mpcabinetIsViewPermissionFlag = false;
          } else {
            if (this.mpcabinetPermission.isView == true && this.mpcabinetPermission.isAdd == false &&
              this.mpcabinetPermission.isEdit == false && this.mpcabinetPermission.isDelete == false) {
              this.mpcabinetIsViewPermissionFlag = true;
            } else if (this.mpcabinetPermission.isView == false && this.mpcabinetPermission.isAdd == false &&
              this.mpcabinetPermission.isEdit == false && this.mpcabinetPermission.isDelete == false) {
              this.mpcabinetIsViewPermissionFlag = true;
            } else {
              this.mpcabinetIsViewPermissionFlag = false;
            }
          }
          this.mpcabinetAPIrespFlag = true;
        }
        else if(element.module == "mpmilestone"){
          this.pagePermission.push(element);
          this.mpmilestonePermission = element;
          if (this.isAdmin == true) {
            this.mpmilestoneIsViewPermissionFlag = false;
          } else {
            if (this.mpmilestonePermission.isView == true && this.mpmilestonePermission.isAdd == false &&
              this.mpmilestonePermission.isEdit == false && this.mpmilestonePermission.isDelete == false) {
              this.mpmilestoneIsViewPermissionFlag = true;
            } else if (this.mpmilestonePermission.isView == false && this.mpmilestonePermission.isAdd == false &&
              this.mpmilestonePermission.isEdit == false && this.mpmilestonePermission.isDelete == false) {
              this.mpmilestoneIsViewPermissionFlag = true;
            } else {
              this.mpmilestoneIsViewPermissionFlag = false;
            }
          }
          this.mpmilestoneAPIrespFlag = true;
        }
        else if(element.module == "mplinked"){
          this.pagePermission.push(element);
          this.mplinkedPermission = element;

          if (this.isAdmin == true) {
            this.mplinkedIsViewPermissionFlag = false;
          } else {
            if (this.mplinkedPermission.isView == true && this.mplinkedPermission.isAdd == false &&
              this.mplinkedPermission.isEdit == false && this.mplinkedPermission.isDelete == false) {
              this.mplinkedIsViewPermissionFlag = true;
            }else if (this.mplinkedPermission.isView == false && this.mplinkedPermission.isAdd == false &&
              this.mplinkedPermission.isEdit == false && this.mplinkedPermission.isDelete == false) {
              this.mplinkedIsViewPermissionFlag = true;
            } else {
              this.mplinkedIsViewPermissionFlag = false;
            }
          }
          this.mplinkedAPIrespFlag = true;
        }
        else if(element.module == "mpimpacted"){
          this.pagePermission.push(element);
          this.mpimpactedPermission = element;
          if (this.isAdmin == true) {
            this.mpimpactedIsViewPermissionFlag = false;
          } else {
            if (this.mpimpactedPermission.isView == true && this.mpimpactedPermission.isAdd == false &&
              this.mpimpactedPermission.isEdit == false && this.mpimpactedPermission.isDelete == false) {
              this.mpimpactedIsViewPermissionFlag = true;
            } else if (this.mpimpactedPermission.isView == false && this.mpimpactedPermission.isAdd == false &&
              this.mpimpactedPermission.isEdit == false && this.mpimpactedPermission.isDelete == false) {
              this.mpimpactedIsViewPermissionFlag = true;
            } else {
              this.mpimpactedIsViewPermissionFlag = false;
            }
          }
          this.mpimpactedAPIrespFlag = true;
        }
        else if(element.module == "mpsetitem"){
          this.pagePermission.push(element);
          this.mpsetitemPermission = element;
          if (this.isAdmin == true) {
            this.mpsetitemIsViewPermissionFlag = false;
          } else {
            if (this.mpsetitemPermission.isView == true && this.mpsetitemPermission.isAdd == false &&
              this.mpsetitemPermission.isEdit == false && this.mpsetitemPermission.isDelete == false) {
              this.mpsetitemIsViewPermissionFlag = true;
            } else if (this.mpsetitemPermission.isView == false && this.mpsetitemPermission.isAdd == false &&
              this.mpsetitemPermission.isEdit == false && this.mpsetitemPermission.isDelete == false) {
              this.mpsetitemIsViewPermissionFlag = true;
            } else {
              this.mpsetitemIsViewPermissionFlag = false;
            }
          }
          this.mpsetitemAPIrespFlag = true;
        }
        else if(element.module == "mptester"){
          this.pagePermission.push(element);
          this.mptesterPermission = element;
          if (this.isAdmin == true) {
            this.mptesterIsViewPermissionFlag = false;
          } else {
            if (this.mptesterPermission.isView == true && this.mptesterPermission.isAdd == false &&
              this.mptesterPermission.isEdit == false && this.mptesterPermission.isDelete == false) {
              this.mptesterIsViewPermissionFlag = true;
            } else if (this.mptesterPermission.isView == false && this.mptesterPermission.isAdd == false &&
              this.mptesterPermission.isEdit == false && this.mptesterPermission.isDelete == false) {
              this.mptesterIsViewPermissionFlag = true;
            } else {
              this.mptesterIsViewPermissionFlag = false;
            }
          }
          this.mptesterAPIrespFlag = true;
        }
        else if(element.module == "mpclarity"){
          this.pagePermission.push(element);
          this.mpclarityPermission = element;
          if (this.isAdmin == true) {
            this.mpclarityIsViewPermissionFlag = false;
          } else {
            if (this.mpclarityPermission.isView == true && this.mpclarityPermission.isAdd == false &&
              this.mpclarityPermission.isEdit == false && this.mpclarityPermission.isDelete == false) {
              this.mpclarityIsViewPermissionFlag = true;
            } else if (this.mpclarityPermission.isView == false && this.mpclarityPermission.isAdd == false &&
              this.mpclarityPermission.isEdit == false && this.mpclarityPermission.isDelete == false) {
              this.mpclarityIsViewPermissionFlag = true;
            } else {
              this.mpclarityIsViewPermissionFlag = false;
            }
          }
          this.mpclarityAPIrespFlag = true;
        }
        else if(element.module == "mpaudit"){
          this.pagePermission.push(element);
          this.mpauditPermission = element;
          this.mpsetitemIsViewPermissionFlag = true;
          this.mpauditAPIrespFlag = true;
        }
        this.setTabPermissionShowHide();
      }   
    })
  }

  setTabPermissionShowHide() {
    if (this.mpauditAPIrespFlag == true && this.mpproductAPIrespFlag == true && this.mpdependencyAPIrespFlag == true
      && this.mpcabinetAPIrespFlag == true && this.mptesterAPIrespFlag == true && this.mpsetitemAPIrespFlag == true
      && this.mplinkedAPIrespFlag == true && this.mpimpactedAPIrespFlag == true && this.mpclarityAPIrespFlag == true
      && this.mpmilestoneAPIrespFlag == true) {
      this.isTabFlag = true;
      setTimeout(()=>{
        
        this.tabGroup.selectedIndex = 0;
        this.selectedIndex = 0;
      },2000); 
    } else {
      this.isTabFlag = false;
    }
  }
  ngOnInit(): void {
    this.IsManagePinAdmin();
    if(this.commonService.menuJson){
      this.getPermissionmpMasterByModule(this.commonService.menuJson);
    }
    else{
      this.commonService.getMenuJson().subscribe(res =>{
        if(res){
        this.getPermissionmpMasterByModule(res);
        }
      });
    }
    this.tabid = 0;
    this.tabname = "product";
    this.tabAlignment = "left";
  }

  getRequestPinById() {
    this.setitemInput = { planitem: null, savedata: null };
    this.dependencyInput = { planitem: null, savedata: null };
    this.testdetailsInput = { planitem: null, savedata: null };
    this.masterApiService.getRequestPinById(this.extraPinAPi + "managepin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.setitemInput = { planitem: data, savedata: null }
      this.dependencyInput = { planitem: data, savedata: null };
      this.testdetailsInput = { planitem: data, savedata: null };
      //this.viewExtrapinRequestForm();
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
    if(data.data != undefined && data.data?.status.toLowerCase() == "invalid")
    {
      this.isProductErr = true;
    }
    else
    {
      if (data.data != undefined) {
        this.productParam = data.data.value;
        this.productFlag = data.flag;
        this.isProductErr = false;
  
        // let validateURL = this.extraPinAPi + "ManagePin/validate/" + this.pinId;
        // this.masterApiService.managePinUpdate(validateURL, this.productParam).subscribe(data => {
        //   if (data.isSuccess) {
        //   }
        //   if (!data.isSuccess) {
        //     this.notificationAlert.open();
        //     this.message = data.message;
        //   }
        // });
      }
    }
    this.spinner.hide();
  }

  cabinetEvent(data) {
    this.cabinetParam.planitem = this.pinId;
    this.cabinetParam.cabinetIds = data.data;
    this.cabinetFlag = data.flag;
  }

  clarityEvent(data) {
    if(data.data == undefined && (data.data.status =! undefined  && data.data?.status.toLowerCase() == "invalid"))
    {
      this.isclarityErr = true;
    }
    else
    {
    this.clarityParam = data.data;
    this.clarityFlag = data.flag;
    this.isclarityErr = false;
    }
  }

  milestoneEvent(data) {
  
    if((data.data.planApprDate == undefined || data.data.planApprDate == null ))
    {
      this.isMilestoneErr = true;
    }
    else
    {
    this.milestoneParam = data.data;
    this.milestoneFlag = data.flag;
    this.isMilestoneErr = false;
    }
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
  otherEventLinkpin(data) {
    if (data.name == "linkpinno") {
      this.linkedpinParam.planitem = this.pinId;
      this.linkedpinParam.linkedPins = data.data;
      this.linkedPinFlag = data.flag;
    }
  }
  otherEventImpacpin(data) {
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
    if(!this.isErr)
    {
      this.getRequestPinById();
    this.saveflag = true;
    this.cdr.detectChanges();
    }
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
    if(this.isProductErr)
    {
      this.tabChange(0);
      this.isErr = true;
      this.notificationAlert.open();
      this.message = "Product Tab: Data not saved. Validation error occured.";
    }
    else  if(this.isMilestoneErr)
    {
      this.tabChange(1);
      this.isErr = true;
      this.notificationAlert.open();
      this.message = "Milestone Tab: Data not saved. Validation error occured.";
    }
    else  if(this.isclarityErr)
    {
      this.tabChange(0);
      this.isErr = true;
      this.notificationAlert.open();
      this.message = "Clarity Tab: Data not saved. Validation error occured.";
    }
    else{
      if (this.productFlag == true && this.mpproductPermission.isEdit == true ) {
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
            if(data){
              this.spinner.hide();
              this.masterApiService.debuggerLog(this.debuggerflag, "product plan Details Saved Success", data);
              if (data.isSuccess) {
                this.productFlag = false;
                this.notificationAlert.open();
                this.message = data.message;
              }
              if (!data.isSuccess) {
                this.tabChange(0);
                this.isErr = true;
                this.notificationAlert.open();
                this.message = data.message;
              }
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
          if(data){
            this.spinner.hide();
            if (data.isSuccess) {
              this.milestoneFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
          
        });
      }
      if ((this.dependencyFlag == true) && (this.mpdependencyPermission.isEdit == true || this.mpdependencyPermission.isDelete == true || this.mpdependencyPermission.isAdd == true)) {
        dependencyUrl = this.extraPinAPi + "Dependency/savelist";
        this.masterApiService.masterAdd(dependencyUrl, this.dependencyParam).subscribe(data => {
          if(data){
            this.spinner.hide();
            this.masterApiService.debuggerLog(this.debuggerflag, "dependenc Details Saved Success", data);
            this.dependencyInput = { planitem: this.viewExtrapinRequestData, savedata: data }
            if (data.isSuccess) {
              this.dependencyFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
         
        });
        // this.cdr.detectChanges();
      }
      if (this.cabinetFlag == true && this.mpcabinetPermission.isEdit == true) {
        cabinetUrl = this.extraPinAPi + "ManagePinCabinet/savelist";
        this.masterApiService.masterAdd(cabinetUrl, this.cabinetParam).subscribe(data => {
          this.masterApiService.debuggerLog(this.debuggerflag, "cabinet Details Saved Success", data);
          if(data){
            this.spinner.hide();
            if (data.isSuccess) {
              this.cabinetFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.notificationAlert.open();
              this.isErr = true;
              this.message = data.message;
            }
          }
        });
      }
      if ((this.testerPlanFlag == true) && (this.mptesterPermission.isEdit == true || this.mptesterPermission.isDelete == true || this.mptesterPermission.isAdd == true)) {
        testerPlanUrl = this.extraPinAPi + "testerplan/savelist";
        this.masterApiService.masterAdd(testerPlanUrl, this.testerdetailsParam).subscribe(data => {
          this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
          this.masterApiService.debuggerLog(this.debuggerflag, "tester plan Details Saved Success", data);
          if(data){
            this.spinner.hide();
            if (data.isSuccess) {
              this.testerPlanFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
          
        });
        //this.cdr.detectChanges();
      }
      if ((this.setItemFlag == true) && (this.mpsetitemPermission.isEdit == true || this.mpsetitemPermission.isDelete == true || this.mpsetitemPermission.isAdd == true)) {
        setItemUrl = this.extraPinAPi + "ManagePinSetItem/savelist";
        this.masterApiService.masterAdd(setItemUrl, this.setitemParam).subscribe(data => {
          if(data){
            this.spinner.hide();
            this.masterApiService.debuggerLog(this.debuggerflag, "Set Item Details Saved Success", data);
            // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
            if (data.isSuccess) {
              this.setItemFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
         
        });
        //this.cdr.detectChanges();
      }
      if ((this.linkedPinFlag == true) && (this.mplinkedPermission.isEdit == true || this.mplinkedPermission.isDelete == true || this.mpimpactedPermission.isAdd == true)) {
        linkedPinUrl = this.extraPinAPi + "LinkedPin/savelist";
        this.masterApiService.masterAdd(linkedPinUrl, this.linkedpinParam).subscribe(data => {
          if(data){
            this.spinner.hide();
            this.masterApiService.debuggerLog(this.debuggerflag, "linked Pin Details Saved Success", data);
            // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
            if (data.isSuccess) {
              this.linkedPinFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
         
        });
        //this.cdr.detectChanges();
      }
      if ((this.impactedPinFlag == true) && (this.mpimpactedPermission.isEdit == true || this.mpimpactedPermission.isDelete == true
        || this.mpimpactedPermission.isAdd == true)) {
        impactedPinUrl = this.extraPinAPi + "ImpactedPin/savelist";
        this.masterApiService.masterAdd(impactedPinUrl, this.impacpinParam).subscribe(data => {
          if(data){
            this.spinner.hide();
            this.masterApiService.debuggerLog(this.debuggerflag, "impacted Pin Details Saved Success", data);
            // this.testdetailsInput = { planitem: this.viewExtrapinRequestData, savedata: data }
            if (data.isSuccess) {
              this.impactedPinFlag = false;
              this.notificationAlert.open();
              this.message = data.message;
            }
            if (!data.isSuccess) {
              this.isErr = true;
              this.notificationAlert.open();
              this.message = data.message;
            }
          }
        });
        //this.cdr.detectChanges();
      }
      if (this.clarityFlag == true && this.mpclarityPermission.isEdit == true) {
        if (this.clarityParam.projectCode != undefined && this.clarityParam.projectCode != null) {
          clarityUrl = this.extraPinAPi + "Clarity/" + this.clarityParam.projectCode;
          this.masterApiService.managePinUpdate(clarityUrl, this.clarityParam).subscribe(data => {
            if(data){
              this.spinner.hide();
              if (data.isSuccess) {
                this.clarityFlag = false;
                this.notificationAlert.open();
                this.message = "Data saved successfully."; // data.message;
              }
              if (!data.isSuccess) {
                this.isErr = true;
                this.notificationAlert.open();
                this.message = data.message;
              }
            }
           
          });
        }
  
      }
    }
   

    
 
    
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
// this.productParam.platformId = this.productform.value.platformId;
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
