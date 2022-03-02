import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import * as appstringdata from 'src/assets/config/app-string';
import {
  CsvFileTypes,
  IColumnExportingEventArgs,
  IGridToolbarExportEventArgs,
  IgxCsvExporterOptions,
  IgxExcelExporterOptions,
  IgxExporterOptionsBase
} from '@infragistics/igniteui-angular';
import { IgxGridCellComponent } from '@infragistics/igniteui-angular/lib/grids/cell.component';
import { IgxGridRowComponent } from '@infragistics/igniteui-angular/lib/grids/grid/grid-row.component';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';
@Component({
  selector: 'app-rdap-manage-pin-milestone-tab',
  templateUrl: './rdap-manage-pin-milestone-tab.component.html',
  styleUrls: ['./rdap-manage-pin-milestone-tab.component.scss']
})
export class RdapManagePinMilestoneTabComponent implements OnInit,OnChanges {
  @ViewChild('fyselect') fyselect;
  @ViewChild('quaterselect') quaterselect;
  public milestoneform: FormGroup;
  versionarrobj: any[];
  marketarrobj: any[];
  studioarrobj: any[];
  devtypearrobj: any[];
  titlearrobj: any[];
  themearrobj: any[];
  platformarrobj: any[];
  prodcatarrobj: any[];
  sequencearrobj: any[];
  prodcutbasketarrobj: any[];
  videostepperarrobj: any[];
  projectrefarrobj: any[];
  tierarrobj: any[];
  priorityarrobj: any[];
  showarrobj: any[];
  revenuearrobj: any[];
  riskarrobj: any[];
  statusarrobj: any[];
  epprefarrobj: any[];
  denomarrobj: any[];
  fyarrobj: any;
  quarterarrobj: any;
  dataSource: any[];
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  viewExtrapinRequestDataPlanitem: any;
  public baseApi;
  public extrapinbaseApi;
  public permissionApi;
  fyselval: any;
  quarterselval: any;
  valueChangeFlag: boolean;
  emitData: { data: any, flag: false };
  message : any;
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
  @ViewChild('FYalert', { static: true }) public notificationAlert: IgxDialogComponent;
  @Output() milestoneEvent = new EventEmitter<any>();
  @Input() planitem: any;
  @Input() saveflag: any;
  IsManagePinAdminFlag:boolean = false;
  milestoneModel: {
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
    releaseDate: "",
    financialyearId: "",
    quarterId: "",
    netApprDate: ""
  };
  // @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  constructor(private httpClient: HttpClient, private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService, private snackbarInfoService: SnackbarInfoService,
    private location: Location) {
    this.baseApi = environment.baseapiurl;
    this.extrapinbaseApi = environment.extrapinreqapiurl;
    this.viewExtrapinRequestData = this.planitem;
    this.permissionApi = environment.userapiurl;
    this.IsManagePinAdmin();
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }

  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpmilestonePermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpmilestone").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionmilestonemock);
        this.mpmilestonePermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionmilestonemock;
        if(this.mpmilestonePermission.isView == true && this.mpmilestonePermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      } else {
        this.pagePermission.push(res);
        this.mpmilestonePermission = res;
        if(this.mpmilestonePermission.isView == true && this.mpmilestonePermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      }
    });
  }

  public isViewOnlyPermission(){
this.milestoneform.get("planApprDate").disable({ onlySelf: true });
    this.milestoneform.get("gdbReqdDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtDevStartDate").disable({ onlySelf: true });
    this.milestoneform.get("estDevStartDate").disable({ onlySelf: true });
    this.milestoneform.get("devStartDate").disable({ onlySelf: true });
    this.milestoneform.get("intoGigDate").disable({ onlySelf: true });
    this.milestoneform.get("presubDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtIntoCvlDate").disable({ onlySelf: true });
    this.milestoneform.get("estIntoCvlDate").disable({ onlySelf: true });
    this.milestoneform.get("intoCvlDate").disable({ onlySelf: true });
    this.milestoneform.get("devStartDate").disable({ onlySelf: true });
    this.milestoneform.get("estSubDate").disable({ onlySelf: true });
    this.milestoneform.get("estPresubDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtIntoSubDate").disable({ onlySelf: true });
    this.milestoneform.get("estIntoSubDate").disable({ onlySelf: true });
    this.milestoneform.get("intoSubDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtSubDate").disable({ onlySelf: true });
    this.milestoneform.get("subDate").disable({ onlySelf: true });
    this.milestoneform.get("estRecDate").disable({ onlySelf: true });
    this.milestoneform.get("recDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtApprDate").disable({ onlySelf: true });
    this.milestoneform.get("estApprDate").disable({ onlySelf: true });
    this.milestoneform.get("apprDate").disable({ onlySelf: true });
    this.milestoneform.get("tgtReleaseDate").disable({ onlySelf: true });
    this.milestoneform.get("estReleaseDate").disable({ onlySelf: true });
    this.milestoneform.get("releaseDate").disable({ onlySelf: true });
    //this.milestoneform.get("financialyearId").disable({ onlySelf: true }financialyearId);
    //this.milestoneform.get("quarterId").disable({ onlySelf: true }quarterId);
    this.milestoneform.get("netApprDate").disable({ onlySelf: true });
  }

  ngOnInit(): void {
    this.IsManagePinAdmin();
    this.callDdlApi();
    this.valueChangeFlag = false;
    this.viewExtrapinRequestData = this.planitem;
    this.viewExtrapinRequestDataPlanitem = this.planitem
    this.pinId = this.planitem.data.planitem;
    //this.milestoneform.controls["financialyearId"].setValue(this.viewExtrapinRequestData.data.financialyearId);
    this.buildForm();
    this.getMilestoneById();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.buildForm();
    this.getMilestoneById();
  }
  onDateChange(event, formctrlname) {
    this.valueChangeFlag = false;
    this.emitData = { data: null, flag: false };
    if(event.value != null)
    {
      this.milestoneform.value[formctrlname] = moment(event.value).format("YYYY-MM-DD");
    this.milestoneModel[formctrlname] = moment(event.value).format("YYYY-MM-DD");
    }
    else{
      this.milestoneform.value[formctrlname] = null;
    this.milestoneModel[formctrlname] = null;
    }
    
    Object.keys(this.viewExtrapinRequestData.data).forEach(key => {
      if (((key != "lastupdatedby") && (key != "lastupdateddate") && (key != "createdby") && (key != "createddate") && (key != "planitem")) && this.viewExtrapinRequestData.data[key] != this.milestoneform.value[key]) {
        this.valueChangeFlag = true;
      }
    });
    if((formctrlname == "netApprDate") || (formctrlname == "tgtApprDate") 
    || (formctrlname == "estApprDate") || (formctrlname == "apprDate")
    || (formctrlname == "planApprDate")){
      this.netApprovalFunc(this.milestoneform,this.milestoneModel,this.valueChangeFlag);
    }else{
      this.emitData = { data: this.milestoneModel, flag: this.valueChangeFlag };
      this.milestoneEvent.emit(this.emitData);
    }
  }
  ddlOnChangeEvent(event, formctrlname) {
    this.valueChangeFlag = false;
    this.emitData = { data: null, flag: false };
    this.milestoneform.value[formctrlname] = event.id;
    this.milestoneModel[formctrlname] = event.id;
    Object.keys(this.viewExtrapinRequestData.data).forEach(key => {
      if (((key != "lastupdatedby") && (key != "lastupdateddate") && (key != "createdby") && (key != "createddate") && (key != "planitem")) && this.viewExtrapinRequestData.data[key] != this.milestoneform.value[key]) {
        this.valueChangeFlag = true;
      }
    });
    this.emitData = { data: this.milestoneModel, flag: this.valueChangeFlag };
    this.milestoneEvent.emit(this.emitData);
    //this.milestoneEvent.emit(this.milestoneform);
  }

  public buildForm() {
    this.milestoneform = this.fb.group({
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
      releaseDate: "",
      financialyearId: "",
      quarterId: "",
      netApprDate: ""
    });
    //this.productform.get('id').disable({ onlySelf: true });
    // this.milestoneform.get('netApprDate').disable({ onlySelf: true });
    this.milestoneform.get('financialyearId').disable({ onlySelf: true });
    this.milestoneform.get('quarterId').disable({ onlySelf: true });
    this.milestoneform.get('tgtDevStartDate').disable({ onlySelf: true });
    this.milestoneform.get('tgtIntoCvlDate').disable({ onlySelf: true });
    this.milestoneform.get('tgtIntoSubDate').disable({ onlySelf: true });
    this.milestoneform.get('tgtSubDate').disable({ onlySelf: true });
    this.milestoneform.get('tgtApprDate').disable({ onlySelf: true });
    this.milestoneform.get('tgtReleaseDate').disable({ onlySelf: true });
  }

  getMilestoneById() {
    this.spinner.show();
    if(this.pinId != undefined)
    {
      this.masterApiService.getRequestPinById(this.extrapinbaseApi + "PinMilestone/" + this.pinId).subscribe(data => {
        this.viewExtrapinRequestData = data;
        this.viewExtrapinRequestForm();
        this.spinner.hide();
      });
    }
    
  }
  callDdlApi() {
    this.fyarrobj = [];
    this.quarterarrobj = [];
    this.masterApiService.masterSearchDDL(this.baseApi + "FinancialYear/ddl").subscribe(data => {
      this.fyarrobj = [...this.fyarrobj, data];
      this.fyarrobj = this.fyarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "Quarter/ddl").subscribe(data => {
      this.quarterarrobj = [...this.quarterarrobj, data];
      this.quarterarrobj = this.quarterarrobj[0];
    });
  }

  public viewExtrapinRequestForm() {
    this.emitData = { data: null, flag: false };
    this.milestoneModel = {
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
      releaseDate: "",
      financialyearId: "",
      quarterId: "",
      netApprDate: ""
    }
    this.milestoneModel.estPresubDate = this.viewExtrapinRequestData.data.estPresubDate;
    this.milestoneModel.planApprDate = this.viewExtrapinRequestData.data.planApprDate;
    this.milestoneModel.gdbReqdDate = this.viewExtrapinRequestData.data.gdbReqdDate;
    this.milestoneModel.tgtDevStartDate = this.viewExtrapinRequestData.data.tgtDevStartDate;
    this.milestoneModel.estDevStartDate = this.viewExtrapinRequestData.data.estDevStartDate;
    this.milestoneModel.devStartDate = this.viewExtrapinRequestData.data.devStartDate;
    this.milestoneModel.intoGigDate = this.viewExtrapinRequestData.data.intoGigDate;
    this.milestoneModel.presubDate = this.viewExtrapinRequestData.data.presubDate;
    this.milestoneModel.tgtIntoCvlDate = this.viewExtrapinRequestData.data.tgtIntoCvlDate;
    this.milestoneModel.estIntoCvlDate = this.viewExtrapinRequestData.data.estIntoCvlDate;
    this.milestoneModel.intoCvlDate = this.viewExtrapinRequestData.data.intoCvlDate;
    this.milestoneModel.devStartDate = this.viewExtrapinRequestData.data.devStartDate;
    this.milestoneModel.estSubDate = this.viewExtrapinRequestData.data.estSubDate;
    this.milestoneModel.tgtIntoSubDate = this.viewExtrapinRequestData.data.tgtIntoSubDate;
    this.milestoneModel.estIntoSubDate = this.viewExtrapinRequestData.data.estIntoSubDate;
    this.milestoneModel.intoSubDate = this.viewExtrapinRequestData.data.intoSubDate;
    this.milestoneModel.tgtSubDate = this.viewExtrapinRequestData.data.tgtSubDate;
    this.milestoneModel.subDate = this.viewExtrapinRequestData.data.subDate;
    this.milestoneModel.estRecDate = this.viewExtrapinRequestData.data.estRecDate;
    this.milestoneModel.recDate = this.viewExtrapinRequestData.data.recDate;
    this.milestoneModel.tgtApprDate = this.viewExtrapinRequestData.data.tgtApprDate;
    this.milestoneModel.estApprDate = this.viewExtrapinRequestData.data.estApprDate;
    this.milestoneModel.apprDate = this.viewExtrapinRequestData.data.apprDate;
    this.milestoneModel.tgtReleaseDate = this.viewExtrapinRequestData.data.tgtReleaseDate;
    this.milestoneModel.estReleaseDate = this.viewExtrapinRequestData.data.estReleaseDate;
    this.milestoneModel.releaseDate = this.viewExtrapinRequestData.data.releaseDate;
    this.milestoneModel.netApprDate = this.viewExtrapinRequestData.data.apprDate;
    this.milestoneform.controls["planApprDate"].setValue(this.viewExtrapinRequestData.data.planApprDate);
    this.milestoneform.controls["gdbReqdDate"].setValue(this.viewExtrapinRequestData.data.gdbReqdDate);
    this.milestoneform.controls["tgtDevStartDate"].setValue(this.viewExtrapinRequestData.data.tgtDevStartDate);
    this.milestoneform.controls["estDevStartDate"].setValue(this.viewExtrapinRequestData.data.estDevStartDate);
    this.milestoneform.controls["devStartDate"].setValue(this.viewExtrapinRequestData.data.devStartDate);
    this.milestoneform.controls["intoGigDate"].setValue(this.viewExtrapinRequestData.data.intoGigDate);
    this.milestoneform.controls["presubDate"].setValue(this.viewExtrapinRequestData.data.presubDate);
    this.milestoneform.controls["tgtIntoCvlDate"].setValue(this.viewExtrapinRequestData.data.tgtIntoCvlDate);
    this.milestoneform.controls["estIntoCvlDate"].setValue(this.viewExtrapinRequestData.data.estIntoCvlDate);
    this.milestoneform.controls["intoCvlDate"].setValue(this.viewExtrapinRequestData.data.intoCvlDate);
    this.milestoneform.controls["devStartDate"].setValue(this.viewExtrapinRequestData.data.devStartDate);
    this.milestoneform.controls["estSubDate"].setValue(this.viewExtrapinRequestData.data.estSubDate);
    this.milestoneform.controls["estPresubDate"].setValue(this.viewExtrapinRequestData.data.estPresubDate);
    this.milestoneform.controls["tgtIntoSubDate"].setValue(this.viewExtrapinRequestData.data.tgtIntoSubDate);
    this.milestoneform.controls["estIntoSubDate"].setValue(this.viewExtrapinRequestData.data.estIntoSubDate);
    this.milestoneform.controls["intoSubDate"].setValue(this.viewExtrapinRequestData.data.intoSubDate);
    this.milestoneform.controls["tgtSubDate"].setValue(this.viewExtrapinRequestData.data.tgtSubDate);
    this.milestoneform.controls["subDate"].setValue(this.viewExtrapinRequestData.data.subDate);
    this.milestoneform.controls["estRecDate"].setValue(this.viewExtrapinRequestData.data.estRecDate);
    this.milestoneform.controls["recDate"].setValue(this.viewExtrapinRequestData.data.recDate);
    this.milestoneform.controls["tgtApprDate"].setValue(this.viewExtrapinRequestData.data.tgtApprDate);
    this.milestoneform.controls["estApprDate"].setValue(this.viewExtrapinRequestData.data.estApprDate);
    this.milestoneform.controls["apprDate"].setValue(this.viewExtrapinRequestData.data.apprDate);
    this.milestoneform.controls["tgtReleaseDate"].setValue(this.viewExtrapinRequestData.data.tgtReleaseDate);
    this.milestoneform.controls["estReleaseDate"].setValue(this.viewExtrapinRequestData.data.estReleaseDate);
    this.milestoneform.controls["releaseDate"].setValue(this.viewExtrapinRequestData.data.releaseDate);
    //this.milestoneform.controls["financialyearId"].setValue(this.viewExtrapinRequestData.data.financialyearId);
    //this.milestoneform.controls["quarterId"].setValue(this.viewExtrapinRequestData.data.quarterId);
    this.milestoneform.controls["netApprDate"].setValue(this.viewExtrapinRequestData.data.planApprDate);
    this.emitData = { data: this.milestoneModel, flag: false };
    //this.milestoneform.get('netApprDate').disable({ onlySelf: true });
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtDevStartDate != null)){
      this.milestoneform.get('tgtDevStartDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtDevStartDate == null)){
      this.milestoneform.get('tgtDevStartDate').enable({ onlySelf: true });
    }
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtIntoCvlDate != null)){
      this.milestoneform.get('tgtIntoCvlDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtIntoCvlDate == null)){
      this.milestoneform.get('tgtIntoCvlDate').enable({ onlySelf: true });
    }
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtIntoSubDate != null)){
      this.milestoneform.get('tgtIntoSubDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtIntoSubDate == null)){
      this.milestoneform.get('tgtIntoSubDate').enable({ onlySelf: true });
    }
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtSubDate != null)){
      this.milestoneform.get('tgtSubDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtSubDate == null)){
      this.milestoneform.get('tgtSubDate').enable({ onlySelf: true });
    }
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtApprDate != null)){
      this.milestoneform.get('tgtApprDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtApprDate == null)){
      this.milestoneform.get('tgtApprDate').enable({ onlySelf: true });
    }
    if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtReleaseDate != null)){
      this.milestoneform.get('tgtReleaseDate').disable({ onlySelf: true });
    }else if((this.IsManagePinAdminFlag == false)&&(this.viewExtrapinRequestData.data.tgtReleaseDate == null)){
      this.milestoneform.get('tgtReleaseDate').enable({ onlySelf: true });
    }

    if(this.IsManagePinAdminFlag == true){
    // this.milestoneform.get('netApprDate').disable({ onlySelf: true });
    // this.milestoneform.get('financialyearId').disable({ onlySelf: true });
    // this.milestoneform.get('quarterId').disable({ onlySelf: true });
    this.milestoneform.get('tgtDevStartDate').enable({ onlySelf: true });
    this.milestoneform.get('tgtIntoCvlDate').enable({ onlySelf: true });
    this.milestoneform.get('tgtIntoSubDate').enable({ onlySelf: true });
    this.milestoneform.get('tgtSubDate').enable({ onlySelf: true });
    this.milestoneform.get('tgtApprDate').enable({ onlySelf: true });
    this.milestoneform.get('tgtReleaseDate').enable({ onlySelf: true });
    }
    this.netApprovalFunc(this.milestoneform,this.milestoneModel,this.valueChangeFlag);
    
    //    this.milestoneEvent.emit(this.milestoneform);

  }

  public netApprovalFunc(param,milestoneModelData,flagVal) {
    this.emitData = { data: null, flag: false };
    if(this.milestoneform.status.toLowerCase() == "invalid")
    {
      this.notificationAlert.open();
      this.message= "Market Required Date selection is mandatory.";
    }
    else{
      let milestoneParam = {
        mrd: this.milestoneform.value.planApprDate,
        tad: this.milestoneform.value.tgtApprDate,
        ead: this.milestoneform.value.estApprDate,
        aad: this.milestoneform.value.apprDate
      }
      this.masterApiService.masterSearch(this.extrapinbaseApi + "PinMilestone/getfyquarternad",milestoneParam).subscribe(res => {
      
        this.milestoneform.controls["netApprDate"].setValue(res.data.nad);
        milestoneModelData.netApprDate = res.data.nad;
        this.milestoneform.get('netApprDate').disable({ onlySelf: true });
        if(res.data.financialyearId == 0 && res.data.quarterId > 0)
        {
          this.notificationAlert.open();
          this.message= "Financial year is not configured with selected date. Kindly configure it from masters!";
        }
        else if (res.data.financialyearId > 0 && res.data.quarterId == 0)
        {
          this.notificationAlert.open();
          this.message= "Quarter is not configured with selected date. Kindly configure it from masters!";
        }
        else if (res.data.financialyearId == 0 && res.data.quarterId == 0)
        {
          this.notificationAlert.open();
          this.message= "Quarter and Financial year is not configured with selected date. Kindly configure it from masters!";
        }
        else{
          
          this.milestoneform.controls["financialyearId"].setValue(res.data.financialyearId);
          this.milestoneform.controls["quarterId"].setValue(res.data.quarterId);
          milestoneModelData.quarterId = res.data.quarterId;
      
          milestoneModelData.financialyearId = res.data.financialyearId;
         
          this.milestoneform.get('financialyearId').disable({ onlySelf: true });
          this.milestoneform.get('quarterId').disable({ onlySelf: true });
        this.emitData = { data: milestoneModelData, flag:flagVal };
        this.milestoneEvent.emit(this.emitData);
        }
  
  
      });
    }
   

  }

  public IsManagePinAdmin(){
    this.masterApiService.checkIsManagePinAdmin(this.permissionApi+"Permission/IsManagePinAdmin").subscribe(data => {
      this.IsManagePinAdminFlag = data;
      if(this.IsManagePinAdminFlag == false){
        this.getPermissionmpMasterByModule();
      }
    });
  }
  onDialogSubmit(event){
    event.dialog.close(); 
   
  }

}

