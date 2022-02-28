import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { environment } from "src/environments/environment";
import { Location } from '@angular/common';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string-managepin';
import { IgxGridRowComponent } from 'igniteui-angular/lib/grids/grid/grid-row.component';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
import { debug } from 'console';
import * as moment from 'moment';
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';
@Component({
  selector: 'app-rdap-manage-pin-clarity',
  templateUrl: './rdap-manage-pin-clarity.component.html',
  styleUrls: ['./rdap-manage-pin-clarity.component.scss']
})
export class RdapManagePinClarityComponent implements OnInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;

  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  clarityData: any;
  searchParam: any;
  searchUrl: any;
  exportfilename: string;
  appString: any;
  configdata: any;
  data: any[];
 projectRefData: any;
  clarityform: FormGroup;
  clarityModel: {
    projectCode: null,
    name: null,
    fullName: null,
    aliPlanitem: 0,
    isActive: 0,
    actuals: 0,
    aliGdbRemarks: null,
    description: null,
    scheduleStart: null,
  }
  startdate: any;
  @Output() clarityEvent = new EventEmitter<any>();
  @Input() planitem: any;
 
  pagename: any;
  emitData: { data: any, flag: boolean };
  message: string;
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
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    public fb: FormBuilder, private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.viewExtrapinRequestData = this.planitem;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpclarityPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpclarity").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionclaritymock);
        this.mpclarityPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionclaritymock;
        if(this.mpclarityPermission.isView == true && this.mpclarityPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      } else {
        this.pagePermission.push(res);
        this.mpclarityPermission = res;
        if(this.mpclarityPermission.isView == true && this.mpclarityPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      }          
    this.spinner.hide();
    });
  }
  isViewOnlyPermission(){
    this.clarityform.get("projectCode").disable({ onlySelf: true });
    this.clarityform.get("name").disable({ onlySelf: true });
    this.clarityform.get("fullName").disable({ onlySelf: true });
    this.clarityform.get("aliPlanitem").disable({ onlySelf: true });
    this.clarityform.get("isActive").disable({ onlySelf: true });
    this.clarityform.get("actuals").disable({ onlySelf: true });
    this.clarityform.get("aliGdbRemarks").disable({ onlySelf: true });
    this.clarityform.get("description").disable({ onlySelf: true });
    this.clarityform.get("scheduleStart").disable({ onlySelf: true });
    this.clarityform.get("aliPlanitem").disable({ onlySelf: true });
  }
  ngOnInit(): void {
    this.getPermissionmpMasterByModule();
    this.viewExtrapinRequestData = this.planitem;
    this.pinId = this.planitem.data.planitem;
    this.buildForm();
    this.getClarityById();
    this.masterApiService.getprojectRefValue().subscribe(data => {
      this.projectRefData = data;
      this.clarityModel["projectCode"] = this.projectRefData;
      this.emitData = { data: this.clarityModel, flag: true };
  this.clarityEvent.emit(this.emitData);
      this.buildForm();
    });
  }

  public buildForm() {
    this.clarityform = this.fb.group({
      projectCode: null,
      name: null,
      fullName: null,
      aliPlanitem: 0,
      isActive: 0,
      actuals: 0,
      aliGdbRemarks: null,
      description: null,
      scheduleStart: null,
    });
    this.clarityform.controls['aliPlanitem'].setValue(this.pinId);
    this.clarityform.controls['projectCode'].setValue(this.projectRefData);
    this.clarityform.controls['aliPlanitem'].disable();
    this.clarityform.controls['projectCode'].disable();
  }

  getClarityById() {
    this.spinner.show();
    if(this.pinId != undefined)
    {
    this.masterApiService.getRequestPinById(this.extraPinAPi + "Clarity/getbyplanitem/" + this.pinId).subscribe(data => {
      this.clarityData = data;
      this.viewExtrapinRequestForm();
      this.spinner.hide();
    });
  }
  }
  onDateChange(event, formctrlname) {
    if(this.projectRefData == undefined || this.projectRefData == null || this.projectRefData == "")
{
  this.notificationAlert.open();
  this.message= "Please enter and save Project Ref in Product tab first.";
}
else{
    this.emitData = { data: null, flag: false };
    //this.clarityform.value[formctrlname] = moment(event.value).format("YYYY-MM-DD");
    this.clarityModel[formctrlname] = moment(event.value).format("YYYY-MM-DD");
    this.emitData = { data: this.clarityModel, flag: true };
    this.clarityEvent.emit(this.emitData);
}
  }
  
  onDialogSubmit(event){
    event.dialog.close(); 
    this.getClarityById();
  }

  ddlOnChangeEvent(event, formctrlname) {
    this.clarityModel["projectCode"] = this.projectRefData;
    if(this.projectRefData == undefined || this.projectRefData == null || this.projectRefData == "")
{
  this.notificationAlert.open();
  this.message= "Please enter Project Ref in Product tab first.";
}
else{
  this.emitData = { data: null, flag: false };
  if (formctrlname == "isActive") {
    if (this.clarityform.get(formctrlname).value == true) {
      this.clarityModel[formctrlname] = 1;
    } else {
      this.clarityModel[formctrlname] = 0
    }
  }else{
    this.clarityModel[formctrlname] = this.clarityform.get(formctrlname).value;
  }
  this.emitData = { data: this.clarityModel, flag: true };
  this.clarityEvent.emit(this.emitData);
}


   
  }

  public viewExtrapinRequestForm() {
    this.emitData = { data: null, flag: false };
    this.clarityModel = {
      projectCode: null,
      name: null,
      fullName: null,
      aliPlanitem: 0,
      isActive: 0,
      actuals: 0,
      aliGdbRemarks: null,
      description: null,
      scheduleStart: null,
    }
    this.clarityModel.projectCode = this.clarityData.projectCode = undefined ? null : this.clarityData.projectCode
    this.clarityModel.name = this.clarityData.name = undefined ? null : this.clarityData.name;
    this.clarityModel.fullName = this.clarityData.fullName = undefined ? null : this.clarityData.fullName;
    this.clarityModel.aliPlanitem = this.clarityData.aliPlanitem = undefined ? null : this.clarityData.aliPlanitem;
    this.clarityModel.isActive = this.clarityData.isActive = undefined ? null : this.clarityData.isActive;
    this.clarityModel.actuals = this.clarityData.actuals = undefined ? null : this.clarityData.actuals;
    this.clarityModel.aliGdbRemarks = this.clarityData.aliGdbRemarks = undefined ? null : this.clarityData.aliGdbRemarks;
    this.clarityModel.description = this.clarityData.description = undefined ? null : this.clarityData.description;
    this.clarityModel.scheduleStart = this.clarityData.scheduleStart = undefined ? null : this.clarityData.scheduleStart;
    this.clarityform.controls["projectCode"].setValue(this.clarityData.projectCode);
    this.projectRefData = this.clarityData.projectCode;
    this.clarityform.controls["name"].setValue(this.clarityData.name);
    this.clarityform.controls["fullName"].setValue(this.clarityData.fullName);
    this.clarityform.controls["aliPlanitem"].setValue(this.clarityData.aliPlanitem);
    this.clarityform.controls["isActive"].setValue(this.clarityData.isActive);
    this.clarityform.controls["actuals"].setValue(this.clarityData.actuals);
    this.clarityform.controls["aliGdbRemarks"].setValue(this.clarityData.aliGdbRemarks);
    this.clarityform.controls["description"].setValue(this.clarityData.description);
    this.clarityform.controls["scheduleStart"].setValue(this.clarityData.scheduleStart);
    this.clarityform.controls['aliPlanitem'].setValue(this.pinId);
    this.clarityform.controls['aliPlanitem'].disable();
    this.clarityform.controls['projectCode'].disable();

    this.emitData = { data: this.clarityform, flag: true };
    this.clarityEvent.emit(this.emitData);
  }


}
