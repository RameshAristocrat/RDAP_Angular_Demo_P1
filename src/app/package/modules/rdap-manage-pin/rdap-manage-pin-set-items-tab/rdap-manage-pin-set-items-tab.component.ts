import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  selector: 'app-rdap-manage-pin-set-items-tab',
  templateUrl: './rdap-manage-pin-set-items-tab.component.html',
  styleUrls: ['./rdap-manage-pin-set-items-tab.component.scss']
})
export class RdapManagePinSetItemsTabComponent implements OnInit, OnChanges {
  @ViewChild('setitemgrid', { static: false }) public setitemgrid: IgxGridComponent;
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  searchParam: any;
  searchUrl: any;
  setItemdetails: any;
  exportfilename: string;
  appString: any;
  configdata: any;
  selMasterDetailsData: any;
  setitemDdlData: any;
  inttesterDdlData: any;
  setitemUrl: any;
  inttesterUrl: any;
  testerPlandata: any[];
  setItemdetailsArrObj: any[];
  data: any[];
  emitData: { data: any, flag: boolean };
  addflag:boolean;
  managepin: any;
  mpproductPermission: any;
  mpdependencyPermission: any;
  mpmilestonePermission: any;
  mpcabinetPermission: any;
  mpsetitemPermission: any;
  mplinkedPermission: any;
  mpimpactedPermission: any;
  mpauditPermission: any;
  mpclarityPermission: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  grideditflag:boolean=false;
  @Output() setItemEvent = new EventEmitter<any>();
  //@Input() planitem: any;
  @Input() setitemInput:any;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.addflag = false;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }

  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpsetitemPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpsetitem").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionsetitemmock);
        this.mpsetitemPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionsetitemmock;
       // debugger
        if(this.mpsetitemPermission.isView == true && this.mpsetitemPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mpsetitemPermission.isEdit == true){
          this.grideditflag = true;
        }else{
          this.grideditflag = false
        }
      } else {
        this.pagePermission.push(res);
        this.mpsetitemPermission = res;
        if(this.mpsetitemPermission.isView == true && this.mpsetitemPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mpsetitemPermission.isEdit == true){
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
    this.viewExtrapinRequestData = this.setitemInput.planitem;
    this.pinId = this.viewExtrapinRequestData.data.planitem;
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
    this.spinner.hide();
    this.gridDataLoad();
  }

  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
    //localStorage.setItem("selMasterViewData", JSON.stringify(this.selMasterDetailsData.added[0]));
  }

  gridDataLoad() {
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    if(this.pinId != undefined)
    {
      this.searchUrl = this.extraPinAPi + "ManagePinSetItem/getbyplanitem/" + this.pinId;
      this.masterApiService.getMasterDataById(this.searchUrl).subscribe(x => {
        this.setItemdetails = x;
        if (x.length > 0) {
          this.data = x;
        } else {
          this.data = [];
        }
      });
    }
    
  }

  loadDdlApi() {
    this.setitemUrl = this.baseApi + "setitem/ddl";
    this.masterApiService.masterSearchDDL(this.setitemUrl).subscribe(x => {
      this.setitemDdlData = x;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.gridDataLoad();
  }

  editDone(data) {
    this.emitData= { data: null, flag: false };
    this.setItemdetailsArrObj = [];
    this.setitemgrid.data.forEach(x => {
      this.setItemdetailsArrObj.push({ description: x.description, setitemId: x.setitemId, descrLong: x.descrLong })
    });
    this.emitData= { data: this.setItemdetailsArrObj, flag: true };
    this.setItemEvent.emit(this.emitData);
    // this.commongridmodel.filter(x=>{
    //   x[field].push(event.newSelection.value["id"]);{griddata:this.gameTitleArrObj, busjustify:this.gametitleform}
    // });
  }

  onchangeSelect(event, existcell, data, field, ddldata) {
    let planId = this.setitemInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    let selSetItemData = ddldata.filter(x=>x.id == event.newSelection[0]);
    if (this.addflag == true) {
      this.addflag = false;
      this.data[currRowIndex].description = selSetItemData[0].description2;
      this.data[currRowIndex].descrLong = selSetItemData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].setitemId = selSetItemData[0].id;
      this.data = [...this.data];
    } else {
      this.addflag = false;
      this.data[currRowIndex].description = selSetItemData[0].description2;
      this.data[currRowIndex].descrLong = selSetItemData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].setitemId = selSetItemData[0].id;
      this.data = [...this.data];
    }
    this.editDone(null);
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
  }

  onchangeSelectold(event, existcell, data, field, ddldata) {
    let planId = this.setitemInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    let selSetItemData = ddldata.filter(x=>x.id == event.newSelection[0]);
    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.addflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "description") {
          cell.update(selSetItemData[0].description);
        }
        else if (cell.column.field === "setitemId") {
          cell.update(selSetItemData[0].id);
        } else if (cell.column.field === "descrLong") {
          cell.update(selSetItemData[0].description2);
        } else if (cell.column.field === "planitem") {
          cell.update(planId);
        }
      });
    } else {
      this.addflag = false;
      this.data[currRowIndex].description = selSetItemData[0].description2;
      this.data[currRowIndex].descrLong = selSetItemData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].setitemId = selSetItemData[0].id;
    }
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
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
    //debugger
    console.log("row", row);
    this.addflag = true;
    console.log("setitemgrid",this.setitemgrid.data);
    //this.setitemgrid.beginAddRowByIndex(row.index);
    this.setitemgrid.addRow({createdby: "",
    createddate: "",
    descrLong: "",
    description: "",
    lastupdatedby: "",
    lastupdateddate: "",
    planitem: this.pinId,
    setitem: "",
    setitemId: 0,
    settype: ""});
  }

  public setItemRowAddedDone(event){
    //debugger
    if(this.addflag == true){
      this.setitemgrid.addRow(event.data);
      let lastRec = this.setitemgrid.data.pop();
      let targetIndex = 0;
      this.setitemgrid.data.splice(this.setitemgrid.data.length-1,1);
      this.setitemgrid.data.splice(0,0,lastRec);
    }
    this.editDone(null);
  }

  public deleterow(event) {
    //debugger
    this.emitData = { data: null, flag: false };
    this.setItemdetailsArrObj = [];
    console.log(event.dataRowIndex);
    console.log("before delete", this.setitemgrid.data.length, this.setitemgrid.data);
    if (event.dataRowIndex > -1) {
      this.setitemgrid.data.splice(event.dataRowIndex, 1);
    }
    console.log("after delete", this.setitemgrid.data.length, this.setitemgrid.data);
    this.setitemgrid.data.forEach(x => {
      this.setItemdetailsArrObj.push({ description: x.description, setitemId: x.setitemId, descrLong: x.descrLong })
    });
    this.emitData= { data: this.setItemdetailsArrObj, flag: true };
    this.setItemEvent.emit(this.emitData);
  }
}
