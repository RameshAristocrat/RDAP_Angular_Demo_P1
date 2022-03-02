import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { Observable, Subject } from 'rxjs-compat';
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';

@Component({
  selector: 'app-rdap-manage-pin-product-tab',
  templateUrl: './rdap-manage-pin-product-tab.component.html',
  styleUrls: ['./rdap-manage-pin-product-tab.component.scss']
})
export class RdapManagePinProductTabComponent implements OnInit {
  @ViewChild('decimalalert', { static: true }) public notificationAlert: IgxDialogComponent;
  public productform: FormGroup;
  public productformold: FormGroup;
  message: any;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  numRegex_atf = /^-?\d*[.,]?\d{0,1}$/;
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
  channelarrobj: any[];
  channeltypearrobj: any[];
  regionarrobj: any[];
  gamecomplexityarrobj: any[];
  complexityarrobj: any[];
  currencyarrobj: any[];
  rootcausearrobj: any[];
  fyarrobj: any;
  quarterarrobj: any;
  dataSource: any[];
  route: any;
  routeName: any;
  pinId: any;
  projectRef: string;
  viewExtrapinRequestData: any;
  valueChangeFlag: boolean;
  emitData:{data:any,flag:false};
  public baseApi;
  public extrapinbaseApi;
  @Output() productEvent = new EventEmitter<any>();
  @Input() planitem: any;
  productmodel={
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
  
  revenueforecast:0,
  revenuecurrency:"",
  unitsforecast:0,
  releaseNotes: "",
  marketPriority: "",
  notesCc: "",
  auditTrail: "",
  notesShort: "",
  notesLong: "",
  gamecomplexityId: 0,
  archType: ""}
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  mpproductPermission:any;
  constructor(private httpClient: HttpClient, private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService, private snackbarInfoService: SnackbarInfoService,
    private location: Location,
    private cdr:ChangeDetectorRef) {
    this.baseApi = environment.baseapiurl;
    this.extrapinbaseApi = environment.extrapinreqapiurl;
    this.viewExtrapinRequestData = this.planitem;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpproductPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpproduct").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionproductmock);
        this.mpproductPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionproductmock;
        if(this.mpproductPermission.isView == true && this.mpproductPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      } else {
        this.pagePermission.push(res);
        this.mpproductPermission = res;
        if(this.mpproductPermission.isView == true && this.mpproductPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getPermissionmpMasterByModule();
    this.valueChangeFlag = false;
    this.viewExtrapinRequestData = this.planitem;
    this.buildForm();
    this.callDdlApi();
    this.viewExtrapinRequestForm();
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.auditTrail = this.viewExtrapinRequestData.versionId;
    // this.productParam.channelId = this.viewExtrapinRequestData.versionId;
    // this.productParam.channeltypeId = this.viewExtrapinRequestData.versionId;
    // this.productParam.cvlIts = this.viewExtrapinRequestData.versionId;
    // this.productParam.cvlPriorityId = this.viewExtrapinRequestData.versionId;
    // this.productParam.devtype2Id = this.viewExtrapinRequestData.versionId;
    // this.productParam.denomId = this.viewExtrapinRequestData.versionId;
    // this.productParam.description = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;
    // this.productParam.archType = this.viewExtrapinRequestData.versionId;

  }

  ddlOnChangeEvent(event, formcontrolname) {
    this.emitData={data:null,flag:false};
    this.valueChangeFlag = false;
    
    if(formcontrolname == "projectref")
    {
      
        this.projectRef = event.target.value;
       this.masterApiService.setprojectRefValue(this.projectRef);
       
        
    }
    if (formcontrolname == "channelId") {
      this.masterApiService.masterSearchDDL(this.baseApi + "channeltype/ddlbychannel/" + event.id).subscribe(data => {
        this.productform.controls["channeltypeId"].setValue(0);
        this.channeltypearrobj = [];
        this.channeltypearrobj.push(data);
      });
    }
    else if (formcontrolname == "regionId") {
      this.masterApiService.masterSearchDDL(this.baseApi + "market/ddlbyregion/" + event.id).subscribe(data => {
        this.productform.controls["marketId"].setValue(0);
        this.marketarrobj = [];
        this.marketarrobj.push(data);
      });
    }
    Object.keys(this.viewExtrapinRequestData.data).forEach(key => {
      if (((key != "lastupdatedby") && (key != "lastupdateddate") && (key != "createdby") && (key != "createddate") && (key != "planitem")) && this.viewExtrapinRequestData.data[key] != this.productform.value[key]) {
        this.valueChangeFlag = true;
      }
    });
    this.emitData={data:this.productform,flag:this.valueChangeFlag}
    this.productEvent.emit(this.emitData);
  }

  public buildForm() {
    this.productformold = this.fb.group({
      archType: "",
      auditTrail: "",
      channelId: 0,
      channeltypeId: 0,
      createdby: "",
      createddate: "",
      cvlIts: 0,
      cvlPriorityId: 0,
      denomId: 0,
      description: "",
      devtype2Id: 0,
      eppRefId: 0,
      eqUnits: 0,
      financialyearId: 0,
      gamecomplexityId: 0,
      lastupdatedby: "",
      lastupdateddate: "",
      levelId: 0,
      marketId: 0,
      marketPriority: "",
      notesCc: "",
      notesLong: "",
      notesShort: "",
      planitem: 0,
      platform2Id: 0,
      priorityId: 0,
      prodcat3Id: 0,
      productbasketId: 0,
      programno: "",
      projectref: "",
      quarterId: 0,
      regionId: 0,
      releaseNotes: "",
      revenue: 0,
      riskId: 0,
      sequenceId: 0,
      showId: 0,
      status3Id: 0,
      studioId: 0,
      themeId: 0,
      titleId: 0,
      versionId: 0,
      vidstepId: 0,
      viridianlaunchId: 0,
      revenueforecast:0,
  revenuecurrency:"",
  unitsforecast:0
    })
    this.productform = this.fb.group({
      archType: "",//priority notes
      auditTrail: "",//Audit Trial Notes
      channelId: 0,
      channeltypeId: 0,
      //createdby: "Manoj Negi"
      //createddate: "2021-10-08T16:31:06.713"
      cvlIts: 0,
      cvlPriorityId: 0,
      denomId: 0,
      description: "",
      devtype2Id: 0,
      eppRefId: 0,
      eqUnits: new FormControl('', [ Validators.pattern(this.numRegex_atf)]),
      //financialyearId: 0,
      gamecomplexityId: 0,
      //lastupdatedby: "Manoj Negi"
      //lastupdateddate: "2021-10-08T17:03:02.057"
      levelId: 0,
      marketId: 0,
      marketPriority: "",
      notesCc: "",
      notesLong: "",
      notesShort: "",
      planitem: 0,
      platform2Id: 0,
      priorityId: 0,
      prodcat3Id: 0,
      productbasketId: 0,
      programno: "",
      projectref: "",
      //quarterId: 0,
      regionId: 0,
      releaseNotes: "",
      revenue: new FormControl('', [ Validators.pattern(this.numRegex)]),
      riskId: 0,
      sequenceId: 0,
      showId: 0,
      status3Id: 0,
      studioId: 0,
      themeId: 0,
      titleId: 0,
      versionId: 0,
      vidstepId: 0,
      viridianlaunchId: 0,
      revenueforecast:0,
  revenuecurrency:"",
  unitsforecast:0
    })
    this.productform.get('planitem').disable({ onlySelf: true });
  }

  public oldbuildForm() {
    this.productform = this.fb.group({
      planitem: [],
      versionId: [],
      marketId: [],
      studioId: [],
      devtypeId: [],
      titleId: [],
      themeId: [],
      platformId: [],
      prodcatId: [],
      sequenceId: [],
      prodcutbasketId: [],
      videostepperId: [],
      projectref: [],
      tierId: [],
      priorityId: [],
      showId: [],
      revenueId: [],
      riskId: [],
      statusId: [],
      epprefId: [],
      denomId: [],
      programno: "",
      qacycle: "",
      atfreturns: "",
      gdbreqdby: "",
      marketreqdate: null,
      devstarttarget: null,
      devstartestimate: null,
      devstartactual: null,
      sitfinishactual: null,
      intoqaactual: null,
      precompfinishtarget: null,
      precompfinishactual: null,
      intocompliancetarget: null,
      intocomplianceestimate: null,
      intocomplianceactual: null,
      submittedtarget: null,
      submittedestimate: null,
      submittedactual: null,
      recommendedestimate: null,
      recommendedactual: null,
      approvedtarget: null,
      approvedestimate: null,
      approvedactual: null,
      releasedtarget: null,
      releasedestimate: null,
      releasedactual: null,
      revenue: null
    });
    //this.productform.get("versionId").disable({ onlySelf: true });
    //this.productform.get('id').disable({ onlySelf: true });
    //null
  }
  getRequestPinById() {
    this.spinner.show();
    this.masterApiService.getRequestPinById(this.extrapinbaseApi + "ExtraPin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.viewExtrapinRequestForm();
      this.spinner.hide();
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57))&& charCode != 46) {
      this.notificationAlert.open();
          this.message= "Please enter decimal value!";
      return false;
    }
    return true;

  }
  numberOnlyQA(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
      this.notificationAlert.open();
          this.message= "Please enter numeric value!";
      return false;
    }
    return true;

  }
  onDialogSubmit(event){
    event.dialog.close(); 
   
  }
  callDdlApi() {
    this.versionarrobj = [];
    this.marketarrobj = [];
    this.studioarrobj = [];
    this.devtypearrobj = [];
    this.titlearrobj = [];
    this.themearrobj = [];
    this.platformarrobj = [];
    this.prodcatarrobj = [];
    this.sequencearrobj = [];
    this.prodcutbasketarrobj = [];
    this.videostepperarrobj = [];
    this.projectrefarrobj = [];
    this.tierarrobj = [];
    this.priorityarrobj = [];
    this.showarrobj = [];
    this.revenuearrobj = [];
    this.riskarrobj = [];
    this.statusarrobj = [];
    this.epprefarrobj = [];
    this.denomarrobj = [];
    this.channelarrobj = [];
    this.channeltypearrobj = [];
    this.regionarrobj = [];
    this.gamecomplexityarrobj = [];
    this.currencyarrobj = [];
    this.rootcausearrobj = [];
    this.fyarrobj = [];
    this.quarterarrobj = [];
    this.complexityarrobj = [];
    this.masterApiService.masterSearchDDL(this.baseApi + "version/ddl/false").subscribe(data => {
      this.versionarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "channel/ddl/false").subscribe(data => {
      this.channelarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "channeltype/ddl/false").subscribe(data => {
      this.channeltypearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "gamecomplexity/ddl/false").subscribe(data => {
      this.gamecomplexityarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "region/ddl/false").subscribe(data => {
      this.regionarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/currency").subscribe(data => {
      this.currencyarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "ViridianLaunch/ddl/false").subscribe(data => {
      this.rootcausearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "devtype2/ddl/false").subscribe(data => {
      this.devtypearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "title/ddl/false").subscribe(data => {
      this.titlearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "market/ddl/false").subscribe(data => {
      this.marketarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "studio/ddl/false").subscribe(data => {
      this.studioarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "theme/ddl/false").subscribe(data => {
      this.themearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "platform2/ddl/false").subscribe(data => {
      this.platformarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "prodcat3/ddl/false").subscribe(data => {
      this.prodcatarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "sequence/ddl/false").subscribe(data => {
      this.sequencearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "productbasket/ddl/false").subscribe(data => {
      this.prodcutbasketarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "vidstep/ddl/false").subscribe(data => {
      this.videostepperarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "priority/ddl").subscribe(data => {
      this.priorityarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "show/ddl/false").subscribe(data => {
      this.showarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "risk/ddl/false").subscribe(data => {
      this.riskarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "status3/ddl/false").subscribe(data => {
      this.statusarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "eppref/ddl/false").subscribe(data => {
      this.epprefarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "denom/ddl/false").subscribe(data => {
      this.denomarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "level/ddl/false").subscribe(data => {
      this.tierarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "FinancialYear/ddl/false").subscribe(data => {
      this.fyarrobj = [...this.fyarrobj, data];
      this.fyarrobj = this.fyarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "Quarter/ddl/false").subscribe(data => {
      this.quarterarrobj = [...this.quarterarrobj, data];
      this.quarterarrobj = this.quarterarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/currency").subscribe(data => {
      this.currencyarrobj = [...this.currencyarrobj, data];
      this.currencyarrobj = this.currencyarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "ViridianLaunch/ddl/false").subscribe(data => {
      this.rootcausearrobj = [...this.rootcausearrobj, data];
      this.rootcausearrobj = this.rootcausearrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "Flag/ddl/false").subscribe(data => {
      this.complexityarrobj = [...this.complexityarrobj, data];
      this.complexityarrobj = this.complexityarrobj[0];
    });

    this.viewExtrapinRequestForm();
  }
  public viewExtrapinRequestForm() {
    this.productmodel={
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
      
      revenueforecast:0,
  revenuecurrency:"",
  unitsforecast:0,
      releaseNotes: "",
      marketPriority: "",
      notesCc: "",
      auditTrail: "",
      notesShort: "",
      notesLong: "",
      gamecomplexityId: 0,
      archType: ""}
    // this.productform.controls["planitem"].setValue(this.viewExtrapinRequestData.data.planitem);
    // this.productform.controls["marketId"].setValue(this.viewExtrapinRequestData.data.marketId);
    // this.productform.controls["studioId"].setValue(this.viewExtrapinRequestData.data.studioId);
    // this.productform.controls["titleId"].setValue(this.viewExtrapinRequestData.data.titleId);

    this.productform.controls["archType"].setValue(this.viewExtrapinRequestData.data.archType);
    this.productform.controls["auditTrail"].setValue(this.viewExtrapinRequestData.data.auditTrail);
    this.productform.controls["channelId"].setValue(this.viewExtrapinRequestData.data.channelId);
    this.productform.controls["channeltypeId"].setValue(this.viewExtrapinRequestData.data.channeltypeId);
    this.productform.controls["cvlIts"].setValue(this.viewExtrapinRequestData.data.cvlIts);
    this.productform.controls["cvlPriorityId"].setValue(this.viewExtrapinRequestData.data.cvlPriorityId);
    this.productform.controls["denomId"].setValue(this.viewExtrapinRequestData.data.denomId);
    this.productform.controls["description"].setValue(this.viewExtrapinRequestData.data.description);
    this.productform.controls["devtype2Id"].setValue(this.viewExtrapinRequestData.data.devtype2Id);
    this.productform.controls["eppRefId"].setValue(this.viewExtrapinRequestData.data.eppRefId);
    this.productform.controls["eqUnits"].setValue(this.viewExtrapinRequestData.data.eqUnits);
   // this.productform.controls["financialyearId"].setValue(this.viewExtrapinRequestData.data.financialyearId);
    this.productform.controls["gamecomplexityId"].setValue(this.viewExtrapinRequestData.data.gamecomplexityId);
    this.productform.controls["levelId"].setValue(this.viewExtrapinRequestData.data.levelId);
    this.productform.controls["marketId"].setValue(this.viewExtrapinRequestData.data.marketId);
    this.productform.controls["marketPriority"].setValue(this.viewExtrapinRequestData.data.marketPriority);
    this.productform.controls["notesCc"].setValue(this.viewExtrapinRequestData.data.notesCc);
    this.productform.controls["notesLong"].setValue(this.viewExtrapinRequestData.data.notesLong);
    this.productform.controls["notesShort"].setValue(this.viewExtrapinRequestData.data.notesShort);
    this.productform.controls["planitem"].setValue(this.viewExtrapinRequestData.data.planitem);
    this.productform.controls["platform2Id"].setValue(this.viewExtrapinRequestData.data.platform2Id);
    this.productform.controls["priorityId"].setValue(this.viewExtrapinRequestData.data.priorityId);
    this.productform.controls["prodcat3Id"].setValue(this.viewExtrapinRequestData.data.prodcat3Id);
    this.productform.controls["productbasketId"].setValue(this.viewExtrapinRequestData.data.productbasketId);
    this.productform.controls["programno"].setValue(this.viewExtrapinRequestData.data.programno);
    this.productform.controls["projectref"].setValue(this.viewExtrapinRequestData.data.projectref);
    //this.productform.controls["quarterId"].setValue(this.viewExtrapinRequestData.data.quarterId);
    this.productform.controls["regionId"].setValue(this.viewExtrapinRequestData.data.regionId);
    this.productform.controls["releaseNotes"].setValue(this.viewExtrapinRequestData.data.releaseNotes);
    this.productform.controls["revenue"].setValue(this.viewExtrapinRequestData.data.revenue);
    this.productform.controls["riskId"].setValue(this.viewExtrapinRequestData.data.riskId);
    this.productform.controls["sequenceId"].setValue(this.viewExtrapinRequestData.data.sequenceId);
    this.productform.controls["showId"].setValue(this.viewExtrapinRequestData.data.showId);
    this.productform.controls["status3Id"].setValue(this.viewExtrapinRequestData.data.status3Id);
    this.productform.controls["studioId"].setValue(this.viewExtrapinRequestData.data.studioId);
    this.productform.controls["themeId"].setValue(this.viewExtrapinRequestData.data.themeId);
    this.productform.controls["titleId"].setValue(this.viewExtrapinRequestData.data.titleId);
    this.productform.controls["versionId"].setValue(this.viewExtrapinRequestData.data.versionId);
    this.productform.controls["vidstepId"].setValue(this.viewExtrapinRequestData.data.vidstepId);
    this.productform.controls["viridianlaunchId"].setValue(this.viewExtrapinRequestData.data.viridianlaunchId);
    
    this.productform.controls["revenueforecast"].setValue(this.viewExtrapinRequestData.data.revenueforecast);
    this.productform.controls["revenuecurrency"].setValue(this.viewExtrapinRequestData.data.revenuecurrency);
    this.productform.controls["unitsforecast"].setValue(this.viewExtrapinRequestData.data.unitsforecast);
    

    this.productmodel.revenueforecast = this.viewExtrapinRequestData.data.revenueforecast;
    this.productmodel.revenuecurrency = this.viewExtrapinRequestData.data.revenuecurrency;
    this.productmodel.unitsforecast = this.viewExtrapinRequestData.data.unitsforecast;

    this.productmodel.versionId = this.viewExtrapinRequestData.data.versionId;
    this.productmodel.channelId = this.viewExtrapinRequestData.data.channelId;
    this.productmodel.channeltypeId = this.viewExtrapinRequestData.data.channeltypeId;
    this.productmodel.regionId = this.viewExtrapinRequestData.data.regionId;
    this.productmodel.marketId = this.viewExtrapinRequestData.data.marketId;
    this.productmodel.studioId = this.viewExtrapinRequestData.data.studioId;
    this.productmodel.devtype2Id = this.viewExtrapinRequestData.data.devtype2Id;
    this.productmodel.description = this.viewExtrapinRequestData.data.description;
    this.productmodel.titleId = this.viewExtrapinRequestData.data.titleId;
    this.productmodel.themeId = this.viewExtrapinRequestData.data.themeId;
    this.productmodel.platform2Id = this.viewExtrapinRequestData.data.platform2Id;
    this.productmodel.prodcat3Id = this.viewExtrapinRequestData.data.prodcat3Id;
    this.productmodel.sequenceId = this.viewExtrapinRequestData.data.sequenceId;
    this.productmodel.productbasketId = this.viewExtrapinRequestData.data.productbasketId;
    this.productmodel.vidstepId = this.viewExtrapinRequestData.data.vidstepId;
    this.productmodel.projectref = this.viewExtrapinRequestData.data.projectref;
    this.productmodel.levelId = this.viewExtrapinRequestData.data.levelId;
    this.productmodel.priorityId = this.viewExtrapinRequestData.data.priorityId;
    this.productmodel.showId = this.viewExtrapinRequestData.data.showId;
    this.productmodel.revenue = this.viewExtrapinRequestData.data.revenue;
    this.productmodel.riskId = this.viewExtrapinRequestData.data.riskId;
    this.productmodel.status3Id = this.viewExtrapinRequestData.data.status3Id;
    this.productmodel.cvlIts = this.viewExtrapinRequestData.data.cvlIts;
    this.productmodel.eqUnits = this.viewExtrapinRequestData.data.eqUnits;
    this.productmodel.eppRefId = this.viewExtrapinRequestData.data.eppRefId;
    this.productmodel.denomId = this.viewExtrapinRequestData.data.denomId;
    this.productmodel.programno = this.viewExtrapinRequestData.data.programno;
    this.productmodel.cvlPriorityId = this.viewExtrapinRequestData.data.cvlPriorityId;
    this.productmodel.viridianlaunchId = this.viewExtrapinRequestData.data.viridianlaunchId;
    this.productmodel.releaseNotes = this.viewExtrapinRequestData.data.releaseNotes;
    this.productmodel.marketPriority = this.viewExtrapinRequestData.data.marketPriority;
    this.productmodel.notesCc = this.viewExtrapinRequestData.data.notesCc;
    this.productmodel.auditTrail = this.viewExtrapinRequestData.data.auditTrail;
    this.productmodel.notesShort = this.viewExtrapinRequestData.data.notesShort;
    this.productmodel.notesLong = this.viewExtrapinRequestData.data.notesLong;
    this.productmodel.gamecomplexityId = this.viewExtrapinRequestData.data.gamecomplexityId;
    this.productmodel.archType = this.viewExtrapinRequestData.data.archType;
    this.productform.get("versionId").disable({ onlySelf: true });
    this.productEvent.emit(this.productform);
  }
  isViewOnlyPermission(){
    this.productform.get("archType").disable({ onlySelf: true });
    this.productform.get("auditTrail").disable({ onlySelf: true });
    this.productform.get("channelId").disable({ onlySelf: true });
    this.productform.get("channeltypeId").disable({ onlySelf: true });
    this.productform.get("cvlIts").disable({ onlySelf: true });
    this.productform.get("cvlPriorityId").disable({ onlySelf: true });
    
    this.productform.get("denomId").disable({ onlySelf: true });
    this.productform.get("description").disable({ onlySelf: true });
    this.productform.get("devtype2Id").disable({ onlySelf: true });
    this.productform.get("eppRefId").disable({ onlySelf: true });
    this.productform.get("eqUnits").disable({ onlySelf: true });
   // this.productform.get("financialyearId").disable({ onlySelf: true }financialyearId);
    this.productform.get("gamecomplexityId").disable({ onlySelf: true });
    this.productform.get("levelId").disable({ onlySelf: true });
    this.productform.get("marketId").disable({ onlySelf: true });
    this.productform.get("marketPriority").disable({ onlySelf: true });
    this.productform.get("notesCc").disable({ onlySelf: true });
    this.productform.get("notesLong").disable({ onlySelf: true });
    this.productform.get("notesShort").disable({ onlySelf: true });
    this.productform.get("planitem").disable({ onlySelf: true });
    this.productform.get("platform2Id").disable({ onlySelf: true });
    this.productform.get("priorityId").disable({ onlySelf: true });
    this.productform.get("prodcat3Id").disable({ onlySelf: true });
    this.productform.get("productbasketId").disable({ onlySelf: true });
    this.productform.get("programno").disable({ onlySelf: true });
    this.productform.get("projectref").disable({ onlySelf: true });
    //this.productform.get("quarterId").disable({ onlySelf: true }quarterId);
    this.productform.get("regionId").disable({ onlySelf: true });
    this.productform.get("releaseNotes").disable({ onlySelf: true });
    this.productform.get("revenue").disable({ onlySelf: true });
    this.productform.get("riskId").disable({ onlySelf: true });
    this.productform.get("sequenceId").disable({ onlySelf: true });
    this.productform.get("showId").disable({ onlySelf: true });
    this.productform.get("status3Id").disable({ onlySelf: true });
    this.productform.get("studioId").disable({ onlySelf: true });
    this.productform.get("themeId").disable({ onlySelf: true });
    this.productform.get("titleId").disable({ onlySelf: true });
    this.productform.get("versionId").disable({ onlySelf: true });
    this.productform.get("vidstepId").disable({ onlySelf: true });
    this.productform.get("viridianlaunchId").disable({ onlySelf: true });    
    this.productform.get("revenueforecast").disable({ onlySelf: true });
    this.productform.get("revenuecurrency").disable({ onlySelf: true });
    this.productform.get("unitsforecast").disable({ onlySelf: true });
    
  }
}
