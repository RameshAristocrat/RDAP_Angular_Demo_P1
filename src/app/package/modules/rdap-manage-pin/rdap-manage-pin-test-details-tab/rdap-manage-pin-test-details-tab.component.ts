import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { environment } from "src/environments/environment";
import { Location } from '@angular/common';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import { IgxGridRowComponent } from 'igniteui-angular/lib/grids/grid/grid-row.component';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
import { debug } from 'console';
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';

@Component({
  selector: 'app-rdap-manage-pin-test-details-tab',
  templateUrl: './rdap-manage-pin-test-details-tab.component.html',
  styleUrls: ['./rdap-manage-pin-test-details-tab.component.scss']
})
export class RdapManagePinTestDetailsTabComponent implements OnInit {
  @ViewChild('testdetailsgrid', { static: false }) public testdetailsgrid: IgxGridComponent;
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  searchParam: any;
  searchUrl: any;
  testdetails: any;
  exportfilename: string;
  appString: any;
  configdata: any;
  selMasterDetailsData: any;
  testerDdlData: any;
  inttesterDdlData: any;
  testerUrl: any;
  inttesterUrl: any;
  testerPlandata: any[];
  testdetailsArrObj: any[];
  data: any[];
  planitemId: any;
  @Output() testdetailsEvent = new EventEmitter<any>();
  @Input() testdetailsInput: any;
  emitData: { data: any, flag: boolean };
  debuggerflag:boolean;
  addflag:boolean;
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
  grideditflag:boolean = false;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.debuggerflag = environment.debuggerflag;
    this.addflag = false
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mptesterPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mptester").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiontesterplanmock);
        this.mptesterPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiontesterplanmock;
        debugger
        if(this.mptesterPermission.isView == true && this.mptesterPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mptesterPermission.isEdit == true){
          this.grideditflag = true;
        }else{
          this.grideditflag = false
        }
      } else {
        this.pagePermission.push(res);
        this.mptesterPermission = res;
        if(this.mptesterPermission.isView == true && this.mptesterPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mptesterPermission.isEdit == true){
          this.grideditflag = true;
        }else{
          this.grideditflag = false
        }
      }      
    this.gridDataLoad();    
    this.spinner.hide();
    });
  }
  isViewOnlyPermission(){

  }
  ngOnInit(): void {
    this.getPermissionmpMasterByModule();
    this.viewExtrapinRequestData = this.testdetailsInput.planitem;
    this.pinId = this.viewExtrapinRequestData.data.planitem;
    //this.planitemId = this.planitem.data.planitem;
    // this.getTestDetails();
    this.spinner.show();
    this.appString = [];
    this.data = [];
    this.loadDdlApi();
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
    }
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
    }
  }

  onSelGridRowData(event) {

    this.selMasterDetailsData = event;
    //localStorage.setItem("selMasterViewData", JSON.stringify(this.selMasterDetailsData.added[0]));
  }

  gridDataLoad() {
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    if(this.pinId != undefined)
    {
    this.searchUrl = this.extraPinAPi + "testerplan/getbyplanitem/" + this.pinId;
    this.masterApiService.getMasterDataById(this.searchUrl).subscribe(x => {
      this.testdetails = x;
      console.log("testerplan",x)
      if (x.length > 0) {
        this.data = x;
        this.data.forEach(y => {
          if(y.descrLong == null){
            y.descrLong = "";
          }
        });
      } else {
        this.data = [];
      }
    });
  }
  }

  loadDdlApi() {
    this.testerUrl = this.baseApi + "tester/ddl";
    this.inttesterUrl = this.baseApi + "inttester/ddl";
    this.masterApiService.masterSearchDDL(this.testerUrl).subscribe(x => {
      this.testerDdlData = x;
    });
    this.masterApiService.masterSearchDDL(this.inttesterUrl).subscribe(x => {
      this.inttesterDdlData = x;
    });
  }

  editDone(data) {
    this.emitData = { data: null, flag: false };
    this.testdetailsArrObj = [];
    this.testdetailsgrid.data.forEach(x => {
      this.testdetailsArrObj.push({ testerId: x.testerId, inttesterId: x.inttesterId, descrLong: x.descrLong })
    });
    this.emitData = { data: this.testdetailsArrObj, flag: true };
    this.testdetailsEvent.emit(this.emitData);
  }

  public onchangeSelectOld(event, existcell, data, field, ddldata) {
    this.testerUrl = this.baseApi + "tester/ddl";
    // this.loadDdlApi();
    let selTesterData, selIntTesterData;
    let row: IgxGridRowComponent = existcell.row;
    let currRowIndex = existcell.row.index;
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.addflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (field == "tester") {
          selTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
          if (cell.column.field === "tester") {
            cell.update(selTesterData[0].description);
          }
          else if (cell.column.field === "testerId") {
            cell.update(selTesterData[0].id);
          }
        }
        if (field == "inttester") {
          selIntTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
          if (cell.column.field === "inttester") {
            cell.update(selIntTesterData[0].description);
          }
          else if (cell.column.field === "inttesterId") {
            cell.update(selIntTesterData[0].id);
          }
        }
        if (field == "descrLong") {
          if (cell.column.field === "descrLong") {
            cell.update(event.target.value);
          }
        }
      });
      this.data = [...this.data];
    }else {
      this.addflag = false;
      if (field == "tester") {
        selTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
        this.data[currRowIndex].tester = selTesterData[0].description;
        this.data[currRowIndex].testerId = selTesterData[0].id;
      }
      if (field == "inttester") {
        selIntTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
        this.data[currRowIndex].inttester = selIntTesterData[0].description;
        this.data[currRowIndex].inttesterId = selIntTesterData[0].id;
      }
      if (field == "descrLong") {
        this.data[currRowIndex].descrLong = event.target.value;
      }

      this.data = [...this.data];
    }
  }

  public onchangeSelect(event, existcell, data, field, ddldata) {
    this.testerUrl = this.baseApi + "tester/ddl";
    // this.loadDdlApi();
    let selTesterData, selIntTesterData;
    let row: IgxGridRowComponent = existcell.row;
    let currRowIndex = existcell.row.index;
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
      if (field == "tester") {
        selTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
        this.data[currRowIndex].tester = selTesterData[0].description;
        this.data[currRowIndex].testerId = selTesterData[0].id;
      }
      if (field == "inttester") {
        selIntTesterData = ddldata.filter(x => x.id == event.newSelection[0]);
        this.data[currRowIndex].inttester = selIntTesterData[0].description;
        this.data[currRowIndex].inttesterId = selIntTesterData[0].id;
      }
      if (field == "descrLong") {
        this.data[currRowIndex].descrLong = event.target.value;
      }

      this.data = [...this.data];

      this.editDone(null);
  }

  public startEdit(row?): void {
    const firstEditable = row.cells.filter(cell => cell.editable)[0];
    const grid = row.grid;

    if (grid.rowList.filter(r => r === row).length !== 0) {
      grid.gridAPI.crudService.enterEditMode(firstEditable, event);
      firstEditable.activate();
    }
    row.hide();
  }

  public addNew(row?): void {
    this.masterApiService.debuggerLog(this.debuggerflag,"addNew",row);
    console.log("testergrid",this.testdetailsgrid.data);
    //this.testdetailsgrid.beginAddRowByIndex(row.index);
    this.testdetailsgrid.addRow({createdby: "",
    createddate: "",
    descrLong: "",
    inttester: "",
    inttesterDescription: "",
    inttesterId: 0,
    lastupdatedby: "",
    lastupdateddate: "",
    planitem: this.pinId,
    tester: "",
    testerDescription: "",
    testerId: 0});
  }

  public testDetailsRowAddedDone(event){
    debugger
    
    if(this.addflag == true){
      this.testdetailsgrid.addRow(event.data);
      let lastRec = this.testdetailsgrid.data.pop();
      let targetIndex = 0;
      this.testdetailsgrid.data.splice(this.testdetailsgrid.data.length-1,1);
      this.testdetailsgrid.data.splice(0,0,lastRec);
    }
    this.editDone(null);
  }

  public deleterow(event) {
    this.emitData = { data: null, flag: false };
    this.testdetailsArrObj = [];
    this.masterApiService.debuggerLog(this.debuggerflag,"tester details delete row event.dataRowIndex",event.dataRowIndex);
    this.masterApiService.debuggerLog(this.debuggerflag,"before delete",(this.testdetailsgrid.data.length, this.testdetailsgrid.data));
    if (event.dataRowIndex > -1) {
      this.testdetailsgrid.data.splice(event.dataRowIndex, 1);
    }
    this.masterApiService.debuggerLog(this.debuggerflag,"after delete",(this.testdetailsgrid.data.length, this.testdetailsgrid.data));
    this.testdetailsgrid.data.forEach(x => {
      this.testdetailsArrObj.push({ testerId: x.testerId, inttesterId: x.inttesterId, descrLong: x.descrLong })
    });
    this.emitData = { data: this.testdetailsArrObj, flag: true };
    this.testdetailsEvent.emit(this.emitData);
  }

}
