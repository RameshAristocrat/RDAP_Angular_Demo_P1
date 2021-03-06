import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IGridEditDoneEventArgs, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
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
  selector: 'app-rdap-manage-pin-others-tab',
  templateUrl: './rdap-manage-pin-others-tab.component.html',
  styleUrls: ['./rdap-manage-pin-others-tab.component.scss']
})
export class RdapManagePinOthersTabComponent implements OnInit {
  @ViewChild('linkedpingrid', { static: true }) public linkedpingrid: IgxGridComponent;
  @ViewChild('impactedpingrid', { static: true }) public impactedpingrid: IgxGridComponent;
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  searchParam: any;
  searchUrl: any;
  linkedpindetails: any;
  linkedpindata: any;
  impactedpindata: any;
  exportfilename: string;
  appString: any;
  configdata: any;
  selMasterDetailsData: any;
  linkedpinDdlData: any;
  impactedpinDdlData:any;
  inttesterDdlData: any;
  setitemUrl: any;
  inttesterUrl: any;
  testerPlandata: any[];
  linkedpindetailsArrObj: any[];
  impactedpindetailsArrObj: any[];
  public linkedpinsarrobj: any;
  public impactedpinsarrobj: any;
  data: any[];
  othersform: FormGroup;
  linkedpinUrl: any;
  impactedpinUrl: any;
  @Output() otherEventLinkpin = new EventEmitter<any>();
  @Output() otherEventImpacpin = new EventEmitter<any>();
  @Input() planitem: any;
  linkedpinpagename: any;
  managepinpagename: any;
  linkedPinIsAddRow: boolean = true;
  emitData: { data: any, flag: boolean, name: any };
  linkPinEmitData: { data: any, flag: boolean, name: any };
  impacPinEmitData: { data: any, flag: boolean, name: any };
  linkedPinaddflag: boolean;
  impactedPinaddflag: boolean;
  managepin: any;
  mpproductPermission: any;
  mpdependencyPermission: any;
  mpmilestonePermission: any;
  mpcabinetPermission: any;
  mptesterPermission: any;
  mpsetitemPermission: any;
  @Input() mplinkedPermission: any;
  @Input() mpimpactedPermission: any;
  mpauditPermission: any;
  mpclarityPermission: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  gridlinkeditflag: boolean = false;
  gridimpactededitflag: boolean = false;
  linkPinDdlFilterData: any;
  initLinkPinDDLData:any;
  impacPinDdlFilterData: any;
  initImpacPinDDLData:any;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.viewExtrapinRequestData = this.planitem;
    this.linkedPinaddflag = false;
    this.impactedPinaddflag = false;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
  }

  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.pagePermission.push(this.mplinkedPermission);
    if (this.mplinkedPermission.isView == true && this.mplinkedPermission.isEdit == false) {
      this.isViewOnlyPermission();
    }
    if (this.mplinkedPermission.isEdit == true || this.mplinkedPermission.isAdd == true) {
      this.gridlinkeditflag = true;
    } else {
      this.gridlinkeditflag = false
    }
   
    this.pagePermission.push(this.mpimpactedPermission);
    if (this.mpimpactedPermission.isView == true && this.mpimpactedPermission.isEdit == false) {
      this.isViewOnlyPermission();
    }
    if (this.mpimpactedPermission.isEdit == true || this.mpimpactedPermission.isAdd == true) {
      this.gridimpactededitflag = true;
    } else {
      this.gridimpactededitflag = false
    }
    this.gridDataLoad();
    this.spinner.hide();
  }
  isViewOnlyPermission() {

  }
  ngOnInit(): void {
    this.spinner.show();
    this.pinId = this.planitem.data.planitem;
    this.getPermissionmpMasterByModule();
    this.linkedpinpagename = "managepin-linkedpin";
    this.managepinpagename = "managepin-impactedpin";
    this.viewExtrapinRequestData = this.planitem;
    
    // this.getTestDetails();
    
    this.appString = [];
    this.data = [];
    this.loadDdlApi();
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
    }
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
    }
    this.masterApiService.masterSearchDDL(this.extraPinAPi + "ManagePin/ddl/").subscribe(data => {
      this.linkedpinsarrobj = data;
      this.linkedpinsarrobj = [...this.linkedpinsarrobj, data];
      this.linkedpinsarrobj = this.linkedpinsarrobj;
      this.initLinkPinDDLData = this.linkedpinsarrobj;
      this.initImpacPinDDLData = this.linkedpinsarrobj;
      this.linkPinDdlFilterData = this.linkedpinsarrobj;
      this.impacPinDdlFilterData = this.linkedpinsarrobj;
    });
    // this.gridDataLoad();
    // this.spinner.hide();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.gridDataLoad();
  // }

  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
    //localStorage.setItem("selMasterViewData", JSON.stringify(this.selMasterDetailsData.added[0]));
  }

  gridDataLoad() {
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    if (this.pinId != undefined) {
      this.linkedpinUrl = this.extraPinAPi + "LinkedPin/getbyplanitem/" + this.pinId;
      this.impactedpinUrl = this.extraPinAPi + "impactedpin/getbyplanitem/" + this.pinId;
      this.masterApiService.getMasterDataById(this.linkedpinUrl).subscribe(x => {
        this.linkedpindetails = x.data;
        if (x.length > 0) {
          this.linkedpindata = x;
          this.linkedpindata.forEach(x => {
            this.linkedpinDdlData = this.linkedpinDdlData.filter(y => y.id != x.linkedpinno);
            debugger
            this.linkPinDdlFilterData = this.linkedpinDdlData;
          });
        } else {
          this.linkedpindata = [];
          this.linkPinDdlFilterData = this.initLinkPinDDLData;
        }
      });
    }
    else
    {
      this.linkedpindata = [];
    }
    this.masterApiService.getMasterDataById(this.impactedpinUrl).subscribe(x => {
      this.linkedpindetails = x.data;
      if (x.length > 0) {
        this.impactedpindata = x;
        this.impactedpindata.forEach(x => {
          this.impactedpinDdlData = this.impactedpinDdlData.data.filter(y => y.id != x.impactedpinno);
          this.impacPinDdlFilterData = this.impactedpinDdlData;
        });
      } else {
        this.impactedpindata = [];
        this.impacPinDdlFilterData = this.initImpacPinDDLData;
      }
    });
  }

  loadDdlApi() {
    this.linkedpinUrl = this.extraPinAPi + "linkedpin/search";
    let newsearchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    newsearchParam.sorts.push({ field: "Planitem", direction: "DESC" });
    this.masterApiService.masterSearch(this.linkedpinUrl, newsearchParam).subscribe(x => {
      this.linkedpinDdlData = x;
      this.impactedpinDdlData = x;
      this.initLinkPinDDLData = x;
      this.initImpacPinDDLData = x;
    });
  }
  public linkpincellClick(args) {
    this.linkedpinDdlData = this.initLinkPinDDLData;
    console.log("this.linkedpingrid.data",this.linkedpingrid.data);
    if(this.linkedpingrid.data.length > 0){
      this.linkedpingrid.data.forEach(x => {
        if(x.linkedpinno){
          this.linkedpinDdlData = this.linkedpinDdlData.filter(y => y.id != x.linkedpinno);
          this.linkPinDdlFilterData = this.linkedpinDdlData;
        }
      });
    }
  }
  public impacpincellClick(args) {
    this.impactedpinDdlData = this.initImpacPinDDLData;
    console.log("this.linkedpingrid.data",this.linkedpingrid.data);
    if(this.impactedpingrid.data.length > 0){
      debugger
      this.impactedpingrid.data.forEach(x => {
        if(x.impactedpinno){
          this.impactedpinDdlData = this.impactedpinDdlData.filter(y => y.id != x.impactedpinno);
          this.impacPinDdlFilterData = this.impactedpinDdlData;
        }
      });
    }
  }

  public searchInputFunction(args) {
    let tempextraPinAPi = environment.extrapinreqapiurl + "ManagePin/ddl/" + args.term;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.linkedpinsarrobj = x;
      if(this.linkedpingrid.data.length > 0){
        this.linkedpingrid.data.forEach(x => {
          this.linkedpinsarrobj = this.linkedpinsarrobj.filter(y => y.id != x.linkedpinno);
          this.linkPinDdlFilterData = this.linkedpinsarrobj;
        });
      }
    });
  }

  public searchInputImpacPinFunction(args) {
    let tempextraPinAPi = environment.extrapinreqapiurl + "ManagePin/ddl/" + args.term;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.impactedpinsarrobj = x;
      debugger
      if(this.impactedpingrid.data.length > 0){
        this.impactedpingrid.data.forEach(x => {
          if(x.impactedpinno){
            this.impactedpinsarrobj = this.impactedpinsarrobj.filter(y => y.id != x.impactedpinno);
            this.impacPinDdlFilterData = this.impactedpinsarrobj;
          }
        });
      }
    });
  }

  //impactedpinsarrobj
  public editSearchInputLinkPinFunction(srchtext) {
    let tempextraPinAPi = environment.extrapinreqapiurl + "ManagePin/ddl/" + srchtext;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.linkedpinsarrobj = x;
    });
  }

  public editSearchInputImpacPinFunction(srchtext) {
    let tempextraPinAPi = environment.extrapinreqapiurl + "ManagePin/ddl/" + srchtext;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.impactedpinsarrobj = x;
    });
  }

  editDone(data) {
    this.linkedpindetailsArrObj = [];
    this.linkPinEmitData = { data: null, flag: false, name: "linkpinno" }
    this.linkedpingrid.data.forEach(x => {
      this.linkedpindetailsArrObj.push(x.linkedpinno);
    });
    this.linkPinEmitData = { data: this.linkedpindetailsArrObj, flag: true, name: "linkpinno" }
    this.otherEventLinkpin.emit(this.linkPinEmitData);
  }

  editImpactedPinDone(data) {
    //debugger
    this.impactedpindetailsArrObj = [];
    this.impacPinEmitData = { data: null, flag: false, name: "impacpinno" }
    this.impactedpingrid.data.forEach(x => {
      this.impactedpindetailsArrObj.push(x.impactedpinno)
    });
    this.impacPinEmitData = { data: this.impactedpindetailsArrObj, flag: true, name: "impacpinno" }
    this.otherEventImpacpin.emit(this.impacPinEmitData);
  }

  // onchangeSelect(event, cell, data, field) {
  //   let row: IgxGridRowComponent = cell.row;
  //   row.cells.forEach(function (cell: IgxGridCellComponent) {
  //     if (cell.column.field === "description") {
  //       cell.update(event.newSelection.value.description);
  //     }
  //     else if (cell.column.field === "setitemid") {
  //       cell.update(event.newSelection.value.id);
  //     }else if (cell.column.field === "descrLong") {
  //       cell.update(event.newSelection.value.description2);
  //     }
  //   });
  // }
  onchangeImpactedPinSelect(event, existcell, data, field) {
    let curpin;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    curpin = this.pinId;
    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.impactedPinaddflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "impactedpinno") {
          cell.update(event.newSelection[0]);
        }
        if (cell.column.field === "planitem") {
          cell.update(curpin);
        }
      });
    } else {
      this.impactedPinaddflag = false;
      this.impactedpindata[currRowIndex].impactedpinno = event.newSelection[0];
      this.impactedpindata[currRowIndex].planitem = curpin;
    }

    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }

  }
  editLinkPinStart(event) {
    this.linkedPinIsAddRow = event.isAddRow;
  }
  addLinkPinStart(event) {
  }
  onchangeSelect(event, existcell, data, field) {
    let curpin;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    curpin = this.pinId;

    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.linkedPinaddflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "linkedpinno") {
          cell.update(event.newSelection[0]);
        }
        else if (cell.column.field === "planitem") {
          cell.update(curpin);
        }
      });
    } else {
      this.linkedPinaddflag = false;
      this.linkedpindata[currRowIndex].linkedpinno = event.newSelection[0];
      this.linkedpindata[currRowIndex].planitem = curpin;
    }
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
  }
  //----- CHange on 17.02 ------
  onchangeSelectlinked(event, existcell, data, field) {
    let curpin;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    curpin = this.pinId;
    this.linkedPinaddflag = false;
    this.linkedpindata[currRowIndex].linkedpinno = event.id;
    this.linkedpindata[currRowIndex].planitem = curpin;
    this.editDone(null);
    // if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
    //   this.linkedPinaddflag = true;
    //   row.cells.forEach(function (cell: IgxGridCellComponent) {
    //     if (cell.column.field === "linkedpinno") {
    //       cell.update(event.id);
    //     }
    //     else if (cell.column.field === "planitem") {
    //       cell.update(curpin);
    //     }
    //   });
    // } else {
    //   this.linkedPinaddflag = false;
    //   this.linkedpindata[currRowIndex].linkedpinno = event.id;
    //   this.linkedpindata[currRowIndex].planitem = curpin;
    // }
    // if (event.added) {
    //   event.newSelection = [event.added[0]];
    // } else {
    //   event.newSelection = [];
    // }
  }
  onchangeImpactedSelect(event, existcell, data, field) {
    let curpin;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    curpin = this.pinId;
    this.impactedPinaddflag = false;
    //debugger
    this.impactedpindata[currRowIndex].impactedpinno = event.id;
    this.impactedpindata[currRowIndex].planitem = curpin;
    this.editImpactedPinDone(null);
    // if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
    //   this.impactedPinaddflag = true;
    //   row.cells.forEach(function (cell: IgxGridCellComponent) {
    //     if (cell.column.field === "impactedpinno") {
    //       cell.update(event.id);
    //     }
    //     if (cell.column.field === "planitem") {
    //       cell.update(curpin);
    //     }
    //   });
    // } else {
    //   this.impactedPinaddflag = false;
    //   this.impactedpindata[currRowIndex].impactedpinno = event.id;
    //   this.impactedpindata[currRowIndex].planitem = curpin;
    // }   

  }
  //----- CHange on 17.02 ------
  public rowEditDoneHandler(args: IGridEditDoneEventArgs) {
    // const currRowIndex = this.data.indexOf(args.rowData);
    // this.data[currRowIndex].description = "test desc";
    // this.data[currRowIndex].planitemDep = 47;
    // this.data[currRowIndex].descrLong = "ftf ftgu fhdfdydytdyt";
    // this.data = [...this.data];
    let linkPinParam = {
      planitem: 0,
      linkedpinno: 0
    }
    let linkPinAddEditUrl = this.extraPinAPi + "LinkedPin";
    linkPinParam = {
      planitem: args.newValue.planitem,
      linkedpinno: args.newValue.linkedpinno,
    }
    // if (this.linkedPinIsAddRow == true) {
    // this.masterApiService.masterAdd(linkPinAddEditUrl, linkPinParam).subscribe(data => {
    //   console.log("linkedpin add Details Saved Success", data);
    //   this.gridDataLoad();
    // });
    // } else {

    //}
  }

  public rowImpactedPinEditDoneHandler(args: IGridEditDoneEventArgs) {
    // const currRowIndex = this.data.indexOf(args.rowData);
    // this.data[currRowIndex].description = "test desc";
    // this.data[currRowIndex].planitemDep = 47;
    // this.data[currRowIndex].descrLong = "ftf ftgu fhdfdydytdyt";
    // this.data = [...this.data];
    let impactedPinParam = {
      planitem: 0,
      impactedpinno: 0
    }
    let impacPinAddEditUrl = this.extraPinAPi + "ImpactedPin";
    impactedPinParam = {
      planitem: args.newValue.planitem,
      impactedpinno: args.newValue.impactedpinno,
    }
  }

  public deleteImpactedPinDone(event) {
    let impacPinAddEditUrl = this.extraPinAPi + "ImpactedPin";
    this.masterApiService.deleteMasterDataById(impacPinAddEditUrl + "/" + event.data.planitem + "/" + event.data.impactedpinno).subscribe(data => {
      this.gridDataLoad();
      // if (data.isSuccess) {
      //   this.notificationAlert.open();
      //   this.message= data.message;
      // }
    });
  }

  public deleteLinkedPinDone(event) {
    let linkPinAddEditUrl = this.extraPinAPi + "LinkedPin";
    this.masterApiService.deleteMasterDataById(linkPinAddEditUrl + "/" + event.data.planitem + "/" + event.data.linkedpinno).subscribe(data => {
      this.gridDataLoad();
      // if (data.isSuccess) {
      //   this.notificationAlert.open();
      //   this.message= data.message;
      // }
    });
  }

  getSelLinkPinDetails(id, row) {
    let linkdata;
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.linkedpinUrl = this.extraPinAPi + "linkedpin/searh";
    this.searchParam.filters = [{
      field: "Planitem",
      operator: "Equal",
      value: id.toString()
    }]
    this.masterApiService.masterSearch(this.linkedpinUrl, this.searchParam).subscribe(x => {
      linkdata = x.data;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "linkedpinno") {
          cell.update(id);
        }
        else if (cell.column.field === "version") {
          cell.update(linkdata.version);
        } else if (cell.column.field === "market") {
          cell.update(linkdata.market);
        } else if (cell.column.field === "devtype2") {
          cell.update(linkdata.devtype2);
        } else if (cell.column.field === "studio") {
          cell.update(linkdata.studio);
        } else if (cell.column.field === "description") {
          cell.update(linkdata.description);
        } else if (cell.column.field === "title") {
          cell.update(linkdata.title);
        } else if (cell.column.field === "theme") {
          //cell.update(event.newSelection.value.title);
        } else if (cell.column.field === "platform") {
          //cell.update(event.newSelection.value.title);
        } else if (cell.column.field === "prodcat3") {
          //cell.update(event.newSelection.value.title);
        } else if (cell.column.field === "estApprDate") {
          //cell.update(event.newSelection.value.title);
        } else if (cell.column.field === "apprDate") {
          //cell.update(event.newSelection.value.title);
        }
      });
      //this.linkedpindetails = x.data;
      // if(x.length > 0){
      //   this.linkedpindata = x;
      // }else{
      //   this.linkedpindata = [];
      //}
    });
  }

  public startImpacPinEdit(row?): void {

    let editImpacPinNo = this.impactedpindata[row.index].impactedpinno;
    this.editSearchInputImpacPinFunction(editImpacPinNo);
    let firstEditable = row.cells.filter(cell => cell.editable)[0];
    let grid = row.grid;

    if (grid.rowList.filter(r => r === row).length !== 0) {
      grid.gridAPI.crudService.enterEditMode(firstEditable, event);
      firstEditable.activate();
    }
    row.hide();
  }

  public startLinkPinEdit(row?): void {

    let editRow = this.linkedpindata[row.index].linkedpinno;
    let firstEditable = row.cells.filter(cell => cell.editable)[0];
    let grid = row.grid;

    if (grid.rowList.filter(r => r === row).length !== 0) {
      grid.gridAPI.crudService.enterEditMode(firstEditable, event);
      firstEditable.activate();
    }
    row.hide();
  }

  public addNewLinkGrid(row?): void {
    //debugger
    console.log("this.linkedpingrid", this.linkedpingrid.data);
    //this.linkedpingrid.beginAddRowByIndex(row.index);
    this.linkedpingrid.addRow({
      apprDate: "",
      createdby: "",
      createddate: "",
      description: "",
      devtype2: "",
      estApprDate: "",
      lastupdatedby: "",
      lastupdateddate: "",
      linkedpinno: 0,
      market: "",
      planitem: this.pinId,
      platform: "",
      prodcat3: "",
      status3: "",
      studio: "",
      theme: "",
      title: "",
      version: ""
    });
    this.editDone(null);
  }
  //impactedpinno
  public addNewImpacGrid(row?): void {
    // debugger
    console.log("this.impactedpingrid", this.impactedpingrid.data);
    //this.impactedpingrid.beginAddRowByIndex(row.index);
    //this.linkedpingrid.addRow({});
    this.impactedpingrid.addRow({
      apprDate: "",
      createdby: "",
      createddate: "",
      description: "",
      devtype2: "",
      estApprDate: "",
      lastupdatedby: "",
      lastupdateddate: "",
      impactedpinno: 0,
      market: "",
      planitem: this.pinId,
      platform: "",
      prodcat3: "",
      status3: "",
      studio: "",
      theme: "",
      title: "",
      version: ""
    });
    this.editImpactedPinDone(null);
  }
  public deleteLinkpinrow(event) {
    this.linkedpindetailsArrObj = [];
    this.linkPinEmitData = { data: null, flag: false, name: "linkpinno" }
    if (event.dataRowIndex > -1) {
      this.linkedpingrid.data.splice(event.dataRowIndex, 1);
    }
    this.linkedpingrid.data.forEach(x => {
      this.linkedpindetailsArrObj.push(x.linkedpinno);
    });
    this.linkPinEmitData = { data: this.linkedpindetailsArrObj, flag: true, name: "linkpinno" }
    this.otherEventLinkpin.emit(this.linkPinEmitData);
  }
  public deleteImpacpinrow(event) {
    this.impactedpindetailsArrObj = [];
    this.impacPinEmitData = { data: null, flag: false, name: "impacpinno" }
    if (event.dataRowIndex > -1) {
      this.impactedpingrid.data.splice(event.dataRowIndex, 1);
    }
    this.impactedpingrid.data.forEach(x => {
      this.impactedpindetailsArrObj.push(x.impactedpinno)
    });
    this.impacPinEmitData = { data: this.impactedpindetailsArrObj, flag: true, name: "impacpinno" }
    this.otherEventImpacpin.emit(this.impacPinEmitData);
  }

  public linkedPinRowAddedDone(event) {
    if (this.linkedPinaddflag == true) {
      this.linkedpingrid.addRow(event.data);
      let lastRec = this.linkedpingrid.data.pop();
      let targetIndex = 0;
      this.linkedpingrid.data.splice(this.linkedpingrid.data.length - 1, 1);
      this.linkedpingrid.data.splice(0, 0, lastRec);
    }
    this.editDone(null);
  }

  public impactedPinRowAddedDone(event) {


    if (this.impactedPinaddflag == true) {
      this.impactedpingrid.addRow(event.data);
      let lastRec = this.impactedpingrid.data.pop();
      let targetIndex = 0;
      this.impactedpingrid.data.splice(this.impactedpingrid.data.length - 1, 1);
      this.impactedpingrid.data.splice(0, 0, lastRec);
    }
    this.editImpactedPinDone(null);
  }
}
