import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IGridEditDoneEventArgs, IgxComboComponent, IgxDialogComponent, IgxExcelExporterService, IgxGridComponent, IgxToastComponent } from '@infragistics/igniteui-angular';
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
import { Pipe, PipeTransform } from '@angular/core';
import { threadId } from 'worker_threads';
import { IComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';
@Component({
  selector: 'app-rdap-manage-pin-dependencies-tab',
  templateUrl: './rdap-manage-pin-dependencies-tab.component.html',
  styleUrls: ['./rdap-manage-pin-dependencies-tab.component.scss']
})
export class RdapManagePinDependenciesTabComponent implements OnInit, OnChanges {
  @ViewChild('erroralert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('dependenciesgrid', { static: true }) public dependenciesgrid: IgxGridComponent;
  @ViewChild('impactedpingrid', { static: false }) public impactedpingrid: IgxGridComponent;
  @ViewChild('selectdependency', { static: false }) public selectdependency: NgSelectComponent;
  @ViewChild('loadingToast', { read: IgxToastComponent, static: true }) public loadingToast: IgxToastComponent;
  @ViewChild('remoteCombo', { read: IgxComboComponent, static: true }) public remoteCombo: IgxComboComponent;
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  searchParam: any;
  searchUrl: any;
  dependencydetails: any;
  dependencydata: any;
  impactedpindata: any;
  exportfilename: string;
  appString: any;
  configdata: any;
  selMasterDetailsData: any;
  linkedpinDdlData: any;
  inttesterDdlData: any;
  setitemUrl: any;
  inttesterUrl: any;
  testerPlandata: any[];
  dependencydetailsArrObj: any[];
  data: any[];
  othersform: FormGroup;
  linkedpinUrl: any;
  impactedpinUrl: any;
  dependencyUrl: any;
  dependencybypinUrl: any;
  dependencyddldata: any;
  @Output() dependencyEvent = new EventEmitter<any>();
  //@Input() planitem: any;
  @Input() dependencyInput: any;
  pagename: any;
  dependencyDdlUrl: any;
  public towns = [];
  public townSelected;
  emitData: { data: any, flag: boolean };
  debuggerflag:boolean;
  addflag:boolean;
  message:any;
  duplicateplanitemflag:boolean;
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
  public permissionApi;
  IsManagePinAdminFlag:boolean = false;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.permissionApi = environment.userapiurl;
    //this.viewExtrapinRequestData = this.setitemInput.planitem;
    this.addflag = false;
    this.duplicateplanitemflag = false;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
    this.towns = [
      'New York', 'Washington, D.C.', 'London', 'Berlin', 'Sofia', 'Rome', 'Kiev',
      'Copenhagen', 'Paris', 'Barcelona', 'Vienna', 'Athens', 'Dublin', 'Yerevan',
      'Oslo', 'Helsinki', 'Stockholm', 'Prague', 'Istanbul', 'El Paso', 'Florence', 'Moscow',
      'Jambol', 'Talin', 'Zlatna Panega', 'Queenstown', 'Gabrovo', 'Ugurchin', 'Xanthi'];
  }
  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.mpdependencyPermission= [];
    let rolePermissionMockData;
    this.masterApiService.getPermissionByModule(APIindex.API.permission_Get_By_Module, "mpdependency").subscribe(res => {
      if (this.rolepermissionmock == true) {
        this.pagePermission.push(rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissionsetitemmock);
        this.mpdependencyPermission = rolePermossionMockJs.rdapRolePermossionMock[0].rolepermissiondependencymock;
       // debugger
        if(this.mpdependencyPermission.isView == true && this.mpdependencyPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mpdependencyPermission.isEdit == true){
          this.grideditflag = true;
        }else{
          this.grideditflag = false
        }
      } else {
        this.pagePermission.push(res);
        this.mpdependencyPermission = res;
        if(this.mpdependencyPermission.isView == true && this.mpdependencyPermission.isEdit == false){
          this.isViewOnlyPermission();
        }
        if(this.mpdependencyPermission.isEdit == true){
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
  public IsManagePinAdmin(){
    this.masterApiService.checkIsManagePinAdmin(this.permissionApi+"Permission/IsManagePinAdmin").subscribe(data => {
      this.IsManagePinAdminFlag = data;
      if(this.IsManagePinAdminFlag == false){
        this.grideditflag = true;
      }else{
        this.grideditflag = false;
      }
    });
  }
  ngOnInit(): void {
    this.IsManagePinAdmin();
    if(this.IsManagePinAdminFlag == false){
      this.getPermissionmpMasterByModule();
    }
    this.pagename = "managepintab";
    this.viewExtrapinRequestData = this.dependencyInput.planitem;
    this.pinId = this.viewExtrapinRequestData.data.planitem;
    // this.getTestDetails();
    this.spinner.show();
    this.appString = [];
    this.data = [];
    this.loadDdlApi();
    this.debuggerflag = environment.debuggerflag;
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
    if (this.pinId != undefined) {
      this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
      this.searchParam.sorts.push({ field: "Planitem", direction: "DESC" });
      this.searchParam.filters.push({
        field: "planitem",
        operator: "Equal",
        value: this.pinId.toString()
      });
      this.dependencyUrl = this.extraPinAPi + "Dependency/search";
      if(this.pinId != undefined)
    {
      this.dependencybypinUrl = this.extraPinAPi + "Dependency/getbyplanitem/" + this.pinId;
      this.dependencydata = [];
      this.masterApiService.masterSearch(this.dependencyUrl, this.searchParam).subscribe(x => {
        //this.linkedpindetails = x.data
        if (x.totalRecords > 0) {
          this.dependencydata = x.data;
          this.data = x.data;
        } else {
          this.dependencydata = [];
        }
        
      });
    }
    }

  }

  loadDdlApi() {
    // this.linkedpinUrl = this.baseApi + "linkedpin/ddl";
    this.dependencyDdlUrl = this.extraPinAPi + "managepin/ddl/1";
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.dependencyddldata = [];
    this.searchParam.sorts.push({ field: "Planitem", direction: "DESC" });
    this.masterApiService.masterSearchDDL(this.dependencyDdlUrl).subscribe(x => {
      this.dependencyddldata = x;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.gridDataLoad();
  }

  editDone(data) {
    this.emitData = { data: null, flag: false };
    this.dependencydetailsArrObj = [];
    this.dependenciesgrid.data.forEach(x => {
      this.dependencydetailsArrObj.push({ description: x.description, planitemDep: x.planitemDep, descrLong: x.descrLong })
    });
    this.emitData = { data: this.dependencydetailsArrObj, flag: true };
    this.dependencyEvent.emit(this.emitData);
    // this.commongridmodel.filter(x=>{
    //   x[field].push(event.newSelection.value["id"]);{griddata:this.gameTitleArrObj, busjustify:this.gametitleform}
    // });
    //console.log("this.gametitelgrid", this.gameTitleArrObj);
  }

  depdencyBlurEvent(event) {
  }
  public rowEditDoneHandler(args: IGridEditDoneEventArgs) {
    //debugger
    // const currRowIndex = this.data.indexOf(args.rowData);
    // this.data[currRowIndex].description = "test desc";
    // this.data[currRowIndex].planitemDep = 47;
    // this.data[currRowIndex].descrLong = "ftf ftgu fhdfdydytdyt";
    // this.data = [...this.data];
    // let dependencyParam = {
    //   planitem: 0,
    //   planitemDep: 0,
    //   description: "",
    //   descrLong: ""
    // }
    // let impacPinAddEditUrl = this.extraPinAPi + "Dependency";
    // dependencyParam = {
    //   planitem: args.newValue.planitem,
    //   planitemDep: args.newValue.planitemDep,
    //   description:args.newValue.description,
    //   descrLong:args.newValue.descrLong
    // }
    // this.masterApiService.masterAdd(impacPinAddEditUrl, dependencyParam).subscribe(data => {
    //   console.log("Dependency add Details Saved Success", data);
    //   this.gridDataLoad();
    // });
  }
  onchangeSelect(event, existcell, data, field) {
    let planId = this.dependencyInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    row.cells.forEach(function (cell: IgxGridCellComponent) {
      if (cell.column.field === "description") {
        cell.update(event.newSelection.value.description);
      }
      else if (cell.column.field === "planitemDep") {
        cell.update(event.newSelection.value.planitem);
      } else if (cell.column.field === "descrLong") {
        cell.update(event.newSelection.value.title);
      } else if (cell.column.field === "planitem") {
        cell.update(planId);
      }
    });
    // this.data[currRowIndex].description = event.newSelection.value.description;
    // this.data[currRowIndex].planitemDep = event.newSelection.value.planitem;
    // this.data[currRowIndex].descrLong = event.newSelection.value.title;
    // this.data = [...this.data];
  }

  public searchInputFunction(args) {
    let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.dependencyddldata = x;
    });
  }
  public deleterow(event) {
    this.emitData = { data: null, flag: false };
    this.dependencydetailsArrObj = [];
       if (event.dataRowIndex > -1) {
      this.dependenciesgrid.data.splice(event.dataRowIndex, 1);
   }
    //this.dependenciesgrid.deleteRowById(event.dataRowIndex);
     this.dependenciesgrid.data.forEach(x => {
      this.dependencydetailsArrObj.push({ description: x.description, planitemDep: x.planitemDep, descrLong: x.descrLong })
    });
    this.emitData = { data: this.dependencydetailsArrObj, flag: true };
    this.dependencyEvent.emit(this.emitData);
  }
  public singleSelection(event, existcell, data, field) {
    this.duplicateplanitemflag = false;
    let planId = this.dependencyInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    let selData = this.dependencyddldata.filter(x => x.id == event.newSelection[0]);
    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.addflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "description") {
          cell.update(selData[0].description2);
        }
        else if (cell.column.field === "planitemDep") {
          cell.update(event.newSelection[0]);
        } else if (cell.column.field === "descrLong") {
          cell.update(selData[0].description);
        } else if (cell.column.field === "planitem") {
          cell.update(planId);
        }
      });
      this.data = [...this.data];
    } else {
      this.addflag = false;
      this.data[currRowIndex].description = selData[0].description2;
      this.data[currRowIndex].descrLong = selData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].planitemDep = event.newSelection[0];
      this.data = [...this.data];
    }
    if (event.added) {
      event.newSelection = [event.added[0]];
    } else {
      event.newSelection = [];
    }
  }

  public singleSelectionDependency(event, existcell, data, field) {
    this.duplicateplanitemflag = false;
    let planId = this.dependencyInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    let selData = this.dependencyddldata.filter(x => x.id == event.id);
    if (this.addflag == true) {
      console.log("this.dependenciesgrid",this.dependenciesgrid.data);
      this.addflag = false;
      this.data[currRowIndex].description = selData[0].description2;
      this.data[currRowIndex].descrLong = selData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].planitemDep = event.id;
      this.data = [...this.data];
    } else {
      this.addflag = false;
      this.data[currRowIndex].description = selData[0].description2;
      this.data[currRowIndex].descrLong = selData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].planitemDep = event.id;
      this.data = [...this.data];
    }
    this.editDone(null);
    // if (event.added) {
    //   event.newSelection = [event.added[0]];
    // } else {
    //   event.newSelection = [];
    // }
  }
  
  public singleSelectionDependencyold(event, existcell, data, field) {
    this.duplicateplanitemflag = false;
    let planId = this.dependencyInput.planitem.data.planitem;
    let currRowIndex = existcell.row.index;
    let row: IgxGridRowComponent = existcell.row;
    let selData = this.dependencyddldata.filter(x => x.id == event.id);
    if (existcell.row.inEditMode == true && existcell.row.addRowUI == true) {
      this.addflag = true;
      row.cells.forEach(function (cell: IgxGridCellComponent) {
        if (cell.column.field === "description") {
          cell.update(selData[0].description2);
        }
        else if (cell.column.field === "planitemDep") {
          cell.update(event.id);
        } else if (cell.column.field === "descrLong") {
          cell.update(selData[0].description);
        } else if (cell.column.field === "planitem") {
          cell.update(planId);
        }
      });
      this.data = [...this.data];
    } else {
      this.addflag = false;
      this.data[currRowIndex].description = selData[0].description2;
      this.data[currRowIndex].descrLong = selData[0].description;
      this.data[currRowIndex].planitem = planId;
      this.data[currRowIndex].planitemDep = event.id;
      this.data = [...this.data];
    }
    // if (event.added) {
    //   event.newSelection = [event.added[0]];
    // } else {
    //   event.newSelection = [];
    // }
  }
  public startsWithSearchFn(term) {
    this.spinner.show();
    let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + term.term;
    this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
      this.dependencyddldata = x;
      this.selectdependency.items.push(this.dependencyddldata);
      // this.selectdependency.items=this.dependencyddldata;
      // this.selectdependency.dropdownPanel.items = this.dependencyddldata;
      //this.selectdependency.items=[];
      //this.selectdependency.items=x;
      this.selectdependency.close();
      //this.selectdependency.detectChanges();
      setTimeout(() => {
        //this.selectdependency.isOpen = false;
        //this.selectdependency.isOpen = true;
        //this.selectdependency.handleArrowClick();
        // this.selectdependency.showClear();
        // this.selectdependency.blur();
        this.selectdependency.open();
        this.selectdependency.searchTerm = term.term;
        this.spinner.hide();
      }, 0)
    });
  }

  public startEdit(row?): void {
    debugger
    this.addflag = false;
    const firstEditable = row.cells.filter(cell => cell.editable)[0];
    const grid = row.grid;

    if (grid.rowList.filter(r => r === row).length !== 0) {
        grid.gridAPI.crudService.enterEditMode(firstEditable, event);
        firstEditable.activate();
    }
    row.hide();
}

public addNew(row?):void{
  this.addflag = true;
  this.loadDdlApi();
  this.masterApiService.debuggerLog(this.debuggerflag,"dependency add new row index",row);
  //this.dependenciesgrid.beginAddRowByIndex(row.index);
  this.dependenciesgrid.addRow({apprDate: "",
  createdby: "",
  createddate: "",
  descrLong: "",
  description: "",
  devtype2: "",
  estApprDate: "",
  lastupdatedby: "",
  lastupdateddate: "",
  market: "",
  planitem: this.pinId,
  planitemDep: 0,
  planitemDepDescr: "",
  platform: "",
  prodcat3: "",
  projectref: "",
  status3: "",
  studio: "",
  theme: "",
  title: "",
  version: ""});
  // debugger
  // const firstEditable = row.cells.filter(cell => cell.editable)[0];
  // const grid = row.grid;

  // if (grid.rowList.filter(r => r === row).length !== 0) {
  //     grid.gridAPI.crudService.enterEditMode(firstEditable, event);
  //     firstEditable.activate();
  // }
  // row.hide();
}

public rowAddedDone(event){
 debugger
  if(this.addflag == true){
    this.dependenciesgrid.addRow(event.data);
    let lastRec = this.dependenciesgrid.data.pop();
    let targetIndex = 0;
    this.dependenciesgrid.data.splice(this.dependenciesgrid.data.length-1,1);
    this.dependenciesgrid.data.splice(0,0,lastRec);
  }
}

  public ngAfterViewInit() {

  }

  public dataLoading(evt) {

  }

  public searchInput(searchText) {

  }
  onDialogSubmit(event) {
    event.dialog.close();
  }
}

@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    return collection.filter((item) => item.toString().toLowerCase().startsWith(term.toString().toLowerCase()));
  }
}