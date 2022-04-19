import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { isEmptyString, isNotEmptyVal } from 'src/app/package/modules/rdap-shared-components/utils/shared-utils';
import { RdApiMasterRegionService } from 'src/app/package/api/apicontroller/mastercontroller/rd_api_master_region.service';
import { IgxDialogComponent, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';

import { environment } from "src/environments/environment";
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { filterModel, searchParamModel, sortModel } from 'src/app/package/api/model/param/searchParam';
import { isNotNull } from '@igniteui/material-icons-extended';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import * as numbersearchdata from 'src/assets/config/numberSearchCriteria';
import * as stringsearchdata from 'src/assets/config/stringSearchCriteria';
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';

@Component({
  selector: 'app-rdap-rework-request-list',
  templateUrl: './rdap-rework-request-list.component.html',
  styleUrls: ['./rdap-rework-request-list.component.scss']
})
export class RdapReworkReqListComponent implements OnInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @Output() onSearchSumbit = new EventEmitter<any>();
  public panelOpenState = true;
  public configdata;
  public routedata;
  public formdata;
  public griddata;
  public baseApi;
  public reworkApi;
  public managePinAPi;
  public searchUrl;
  public addUrl;
  public deleteUrl;
  public editUrl;
  public searchFilterData;
  public selMasterDetailsData;
  public searchOrderBy: any;
  public requestStatusobj: any;
  public parentplaneItemobj: any;
  totalCount: number;
  perPage: number = 10;
  timeOut = 500;
  searchform: FormGroup;
  message: any;
  filterform: FormGroup;
  formName: string;
  route: string;
  routeName: string;
  formGroupArr: any[];
  formSelectApiData: any[];
  selectedResult: any;
  gridsource: any[];
  tempFilterData: any[];
  displayedColumns: string[];
  loopGridContent: any[];
  routers: Router;
  exportfilename: string;
  searchGridData: any[];
  appString: any;
  searchParam: searchParamModel;
  sortparam: sortModel;
  sortparamarr: sortModel[];
  filterparam: filterModel;
  filterparamarr: filterModel[];
  stringSearchCriteria: any[];
  numberSearchCriteria: any[];
  pagename: any;
  accessApi: any;
  isShow: boolean = false;
  isView: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isDelete: boolean;
  permissionData: any;
  isReworkAdmin: boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient, location: Location, private _router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private masterRegionService: RdApiMasterRegionService,
    private spinner: RdSpinnerService, private router: Router) {
    this.reworkApi = environment.reworkreqestapi;
    this.baseApi = environment.baseapiurl;
    this.managePinAPi = environment.extrapinreqapiurl;
    this.searchUrl = this.reworkApi + "Rework/search";
    this.exportfilename = "rework_requested_data";
    this.accessApi = environment.userapiurl;
    this.stringSearchCriteria = [];
    this.numberSearchCriteria = [];
    _router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      } else {
        this.route = 'Home'
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.rolebasedPermission();
    this.pagename = "managepinlist";
    this.appString = [];
    this.requestStatusobj = [];
    this.parentplaneItemobj = [];
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
    }
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
    }
    if (numbersearchdata.numberSearch) {
      this.numberSearchCriteria = numbersearchdata.numberSearch;
    }
    if (stringsearchdata.stringSearch) {
      this.stringSearchCriteria = stringsearchdata.stringSearch;
    }
    this.serchfilterFormGroup();
    this.gridDataLoad();
  }

  rolebasedPermission() {
    this.masterApiService.getMasterDataById(this.accessApi + "Permission/IsReworkAdmin").subscribe(data => {
      this.isReworkAdmin = data;
      if (!this.isReworkAdmin) {
        this.masterApiService.getMasterDataById(this.accessApi + "Permission/getbymodule/rework").subscribe(data => {
          this.permissionData = data;
          this.isAdd = data.isAdd;
          this.isEdit = data.isEdit;
          this.isDelete = data.isDelete;
          this.isView = data.isView;
          if (!this.isView) {
            this.isShow = false;
            this.noAccessPermission();
          }
          else {
            this.isShow = true;
          }
        });
      }
      else {
        this.isAdd = true;
        this.isEdit = true;
        this.isDelete = true;
        this.isView = true;
        this.isShow = true;
      }
    });
  }

  noAccessPermission() {
    this.notificationAlert.open();
    this.message = "You are not authorized for this module";
  }

  onDialogSubmit(event) {
    event.dialog.close();
    let url = "/home/dashboard";
    this.router.navigate([url]);
  }

  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
  }

  viewreworkrecord(url) {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('list', 'view/');
    this._router.navigate([tempUrl.toString() + this.selMasterDetailsData.newSelection[0].rwkId]);
  }

  gridDataLoad() {
    this.filterparamarr = [];
    let sortparamarr = [];
    sortparamarr.push({ field: "rwkId", direction: "DESC" });
    this.searchGridData = [];
    this.masterApiService.getData().subscribe(data => {
      if (data) {
        this.searchGridData.push(...data);
        this.totalCount = this.searchGridData.length;
        this.spinner.hide();
      }
    });
    this.masterApiService.getGridData(this.searchUrl, sortparamarr, undefined);
    this.masterApiService
      .masterSearchDDL(this.baseApi + 'Master/ddl/requeststatus')
      .subscribe((data) => {
        this.requestStatusobj.push(data);
      });
    this.masterApiService
      .masterSearchDDL(this.managePinAPi + 'ManagePin/ddl')
      .subscribe((data) => {
        this.parentplaneItemobj.push(data);
      });
  }

  serchfilterFormGroup() {
    this.filterform = this.fb.group({
      rwkId: null,
      rwkIdsearchcriteria: "Equal",
      reason: null,
      reasonsearchcriteria: "Contains",
      justification: null,
      justificationsearchcriteria: "Contains",
      jiraLink: null,
      jiraLinksearchcriteria: "Contains",
      requeststatus: null,
      requeststatussearchcriteria: "Contains",
      parentplanitem: null,
      parentplanitemsearchcriteria: "Equal",
    });
  }

  public onPageChangeEvent(pageNumber: number) {
    this.spinner.show();
    this.searchParam = { pageNumber: pageNumber + 1, pageSize: this.perPage, filters: [], sorts: [] };
    this.filterparamarr = [];
    if (this.filterform.value["rwkId"] != null && !isEmptyString(this.filterform.value["rwkId"])) {
      this.filterparamarr.push({ field: "rwkId", operator: this.filterform.value["rwkIdsearchcriteria"], value: this.filterform.value["rwkId"] })
    }
    if (this.filterform.value["reason"] != null && !isEmptyString(this.filterform.value["reason"])) {
      this.filterparamarr.push({ field: "reason", operator: this.filterform.value["reasonsearchcriteria"], value: this.filterform.value["reason"] })
    }
    if (this.filterform.value["justification"] != null && !isEmptyString(this.filterform.value["justification"])) {
      this.filterparamarr.push({ field: "justification", operator: this.filterform.value["justificationsearchcriteria"], value: this.filterform.value["justification"] })
    }
    if (this.filterform.value["jiraLink"] != null && !isEmptyString(this.filterform.value["jiraLink"])) {
      this.filterparamarr.push({ field: "jiraLink", operator: this.filterform.value["jiraLinksearchcriteria"], value: this.filterform.value["jiralink"] })
    }
    if (this.filterform.value["requeststatus"] != null && !isEmptyString(this.filterform.value["requeststatus"])) {
      this.filterparamarr.push({ field: "requeststatus", operator: this.filterform.value["requeststatussearchcriteria"], value: this.filterform.value["requeststatus"] })
    }
    if (this.filterform.value["parentplanitem"] != null && !isEmptyString(this.filterform.value["parentplanitem"])) {
      this.filterparamarr.push({ field: "parentplanitem", operator: this.filterform.value["rwkIdsearchcriteria"], value: (this.filterform.value["parentplanitem"]).toString() })
    }
    this.searchParam.filters = this.filterparamarr;
    this.searchParam.sorts.push({ field: "rwkId", direction: "DESC" });
    this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
      this.searchGridData = x.data;
      this.totalCount = x.totalRecords;
    });
    this.spinner.hide();
  }

  searchSubmit() {
    this.spinner.show();
    this.searchParam = { pageNumber: 0, pageSize: this.perPage, filters: [], sorts: [] };
    this.filterparamarr = [];
    if (this.filterform.value["rwkId"] != null && !isEmptyString(this.filterform.value["rwkId"])) {
      this.filterparamarr.push({ field: "rwkId", operator: this.filterform.value["rwkIdsearchcriteria"], value: this.filterform.value["rwkId"] })
    }
    if (this.filterform.value["reason"] != null && !isEmptyString(this.filterform.value["reason"])) {
      this.filterparamarr.push({ field: "reason", operator: this.filterform.value["reasonsearchcriteria"], value: this.filterform.value["reason"] })
    }
    if (this.filterform.value["justification"] != null && !isEmptyString(this.filterform.value["justification"])) {
      this.filterparamarr.push({ field: "justification", operator: this.filterform.value["justificationsearchcriteria"], value: this.filterform.value["justification"] })
    }
    if (this.filterform.value["jiraLink"] != null && !isEmptyString(this.filterform.value["jiraLink"])) {
      this.filterparamarr.push({ field: "jiraLink", operator: this.filterform.value["jiraLinksearchcriteria"], value: this.filterform.value["jiralink"] })
    }
    if (this.filterform.value["requeststatus"] != null && !isEmptyString(this.filterform.value["requeststatus"])) {
      this.filterparamarr.push({ field: "requeststatus", operator: this.filterform.value["requeststatussearchcriteria"], value: this.filterform.value["requeststatus"] })
    }
    if (this.filterform.value["parentplanitem"] != null && !isEmptyString(this.filterform.value["parentplanitem"])) {
      this.filterparamarr.push({ field: "parentplanitem", operator: this.filterform.value["rwkIdsearchcriteria"], value: (this.filterform.value["parentplanitem"]).toString() })
    }

    this.searchParam.filters = this.filterparamarr;
    this.searchParam.sorts.push({ field: "rwkId", direction: "DESC" });
    let sortparamarr = [];
    sortparamarr.push({ field: "rwkId", direction: "DESC" });
    this.masterApiService.getData().subscribe(data => {
      if (data) {
        this.searchGridData = [];
        this.searchGridData.push(...data);
        this.totalCount = this.searchGridData.length;
        this.spinner.hide();
      }
    });
    this.masterApiService.getGridData(this.searchUrl, sortparamarr, this.filterparamarr);
  }
}
