import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
import { isEmptyString } from '../../core/utils/shared-utils';
import * as APIindex from '../../api/apiEndpoints/apiIndex';
import * as rolePermossionMock from '../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../assets/config/rolePermissionMockForMaster';
declare function load(): any;
@Component({
  selector: 'app-rdap-extra-pin-request',
  templateUrl: './rdap-extra-pin-request.component.html',
  styleUrls: ['./rdap-extra-pin-request.component.scss']
})
export class RDAPExtraPINRequestComponent implements OnInit, OnChanges {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  public id: any;
  workflowflag: any;
  message: any;
  isErr : boolean = false;
  disableFlag:boolean=true;
  reqParam = {
    requeststatus: "Req",
    channelId: 0,
    channeltypeId: 0,
    regionId: 0,
    marketId: 0,
    studioId: 0,
    pintype: "OG",
    gamecomplexityId: 0,
    linkedPins: [
      0
    ],
    impactToCurrentSchedules: true,
    impactedPins: [
      0
    ],
    marketingreqdate: null,
    financialyearId: 0,
    quarterId: 0,
    unitsforecast: 0,
    revenuecurrency: "",
    revenueforecast: 0,
    incrementalToPlan: true,
    developmentDeviation: "",
    revenueAddedToLe: true,
    businessJustification: "",
    cabinetIds: [
      0
    ],
    gameTitles: [
      {
        titleId: 0,
        title: ""
      }
    ]
  }
  route: string;
  routeName: string;
  baseApi: any;
  pinId: string;
  viewExtrapinRequestData: any;
  tempjoin: any;
  actionFlag: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock:boolean = false;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute,) {      
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
    this.baseApi = environment.extrapinreqapiurl;
    if (this.location.path() != '') {
      this.route = this.location.path();
      this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      this.pinId = this.route.split('/').pop();
      if (this.route.includes('view')) {
        this.actionFlag = "V";
      } else {
        this.actionFlag = "A";
      }
      if (this.pinId) {
        this.getRequestPinById();
      }
    }
  }
  ngOnInit(): void {
    setTimeout(()=>{
      if(this.rolePermissionEnableFlag){
        this.getPermissionByModule();
      }
    },500);
  }
  ngOnChanges():void{
    setTimeout(()=>{
      if(this.rolePermissionEnableFlag){
        this.getPermissionByModule();
      }
    },500);
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
    } else {
      let tempUrl;
      let selMasterData;
      tempUrl = this.route.replace('add', 'list');
      this.router.navigate([tempUrl.toString()]);
    }
  }
  validationFun(){
    if((this.reqParam.channelId != null&& this.reqParam.channelId != 0) && 
    (this.reqParam.channeltypeId != null&& this.reqParam.channeltypeId != 0) &&
    (this.reqParam.requeststatus != null&& this.reqParam.requeststatus != "") && 
    (this.reqParam.regionId != null&& this.reqParam.regionId != 0) &&
    (this.reqParam.marketId != null&& this.reqParam.marketId != 0)  &&
    (this.reqParam.studioId != null&& this.reqParam.studioId != 0) &&
    (this.reqParam.pintype != null&& this.reqParam.pintype != "") &&
    (this.reqParam.gamecomplexityId != null&& this.reqParam.gamecomplexityId != 0) &&
    (this.reqParam.financialyearId != null&& this.reqParam.financialyearId != 0) &&
    (this.reqParam.quarterId != null&& this.reqParam.quarterId != 0) &&
    (this.reqParam.marketingreqdate != null&& this.reqParam.marketingreqdate != 0)
    ){
      this.disableFlag = false;
    }else{
      this.disableFlag = true;
    }
  }
  extraPinReqSubmit() {
    if(this.reqParam.cabinetIds == null || this.reqParam.cabinetIds.length == 0 || this.reqParam.cabinetIds[0] == 0)
    {
      this.reqParam.cabinetIds = null;
    }
    if(this.reqParam.linkedPins == null || this.reqParam.linkedPins.length == 0 || this.reqParam.linkedPins[0] == 0)
    {
      this.reqParam.linkedPins = null;
    }
    if(this.reqParam.impactedPins == null || this.reqParam.impactedPins.length == 0 || this.reqParam.impactedPins[0] == 0)
    {
      this.reqParam.impactedPins = null;
    }
    
    if((this.reqParam.channelId != null&& this.reqParam.channelId != 0) && 
    (this.reqParam.channeltypeId != null&& this.reqParam.channeltypeId != 0) &&
    (this.reqParam.requeststatus != null&& this.reqParam.requeststatus != "") && 
    (this.reqParam.regionId != null&& this.reqParam.regionId != 0) &&
    (this.reqParam.marketId != null&& this.reqParam.marketId != 0)  &&
    (this.reqParam.studioId != null&& this.reqParam.studioId != 0) &&
    (this.reqParam.pintype != null&& this.reqParam.pintype != "") &&
    (this.reqParam.financialyearId != null&& this.reqParam.financialyearId != 0) &&
    (this.reqParam.quarterId != null&& this.reqParam.quarterId != 0) &&
    (this.reqParam.marketingreqdate != null&& this.reqParam.marketingreqdate != 0)
    ){
     // this.spinner.show();
      this.masterApiService.masterAdd(this.baseApi + "ExtraPin", this.reqParam).subscribe(data => {
        if (data.isSuccess) {
          this.notificationAlert.open();
          this.message= data.message;
          //this.snackbarInfoService.openSucessSnackBar(data.message);
          //this.viewrecord();
          //this.cancel();
        }
        else
        {
          this.isErr = true;
          this.notificationAlert.open();
          this.message= data.message; 
        }
        this.spinner.hide();
      });
    }
  }
  getRequestPinById() {
    this.spinner.show();
    if(this.pinId != undefined && this.pinId != 'add')
    {

    this.masterApiService.getRequestPinById(this.baseApi + "ExtraPin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.spinner.hide();
    });
  }
  }
  viewrecord() {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('add', 'list');
    this.router.navigate([tempUrl.toString()]);
  }
  detailsEvent(data) {
    this.reqParam.channelId = data.value.channelId;
    this.reqParam.channeltypeId = data.value.channeltypeId;
    this.reqParam.regionId = data.value.regionId;
    this.reqParam.marketId = data.value.marketId;
    this.reqParam.studioId = data.value.studioId;
    this.reqParam.pintype = data.value.pintype;
    this.reqParam.gamecomplexityId = data.value.gamecomplexityId;
    this.validationFun();
  }
  linkedPinEvent(data) {

    this.reqParam.linkedPins = data.value.linkedPins;
    this.reqParam.impactToCurrentSchedules = data.value.impactToCurrentSchedules;
    this.reqParam.impactedPins = data.value.impactedPins;
    this.reqParam.marketingreqdate=data.value.marketingreqdate;
     this.reqParam.financialyearId = data.getRawValue().financialyearId;//data.value.financialyearId;
     this.reqParam.quarterId =data.getRawValue().quarterId;// data.value.quarterId;
    this.reqParam.revenuecurrency = data.value.revenuecurrency;
    this.reqParam.revenueforecast = data.value.revenueforecast;
    this.reqParam.unitsforecast = data.value.unitsforecast;
    this.reqParam.incrementalToPlan = data.value.incrementalToPlan;
    this.reqParam.developmentDeviation = data.value.developmentDeviation;
    this.reqParam.revenueAddedToLe = data.value.revenueAddedToLe;
    this.validationFun();
  }
  

  cabinetEvent(data) {
    this.reqParam.cabinetIds = data;
    this.validationFun();
  }
  gametitleEvent(data) {

    this.reqParam.gameTitles = data;
    this.validationFun();
  }
  gametitleBusJustEvent(data) {

    this.reqParam.businessJustification = data.value.businessJustification;
    this.validationFun();
  }
  workflowEvent(data) {
    this.workflowflag = "CLOSE";
  }
  workflowtabclick() {
    this.spinner.show();
    setTimeout(() => {
      load();
      this.spinner.hide();
    }, 2000);
  }
  onDialogSubmit(event){
    event.dialog.close(); 
    if(!this.isErr)
    {
      this.message = this.viewrecord();
    }
    
  }

  public getPermissionByModule() {
    this.pagePermission = [];
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "ExtraPin").subscribe(res => {
      if(this.rolepermissionmock == true){
        this.pagePermission.push(rolePermossionMock.rdapRolePermossionMock[0].rolepermissionextrapinmock);
      }else{
        this.pagePermission.push(res);
      }
    });
  }
}
