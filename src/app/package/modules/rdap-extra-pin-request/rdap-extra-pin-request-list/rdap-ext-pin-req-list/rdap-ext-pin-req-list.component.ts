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

import { environment } from "src/environments/environment";
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { filterModel, searchParamModel, sortModel } from 'src/app/package/api/model/param/searchParam';
import { isNotEmptyString, _isNotEmptyString, _isNotEmptyVal } from '../../../rdap-shared-components/utils/shared-utils';
import { isNotNull } from '@igniteui/material-icons-extended';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import * as numbersearchdata from 'src/assets/config/numberSearchCriteria';
import * as stringsearchdata from 'src/assets/config/stringSearchCriteria';
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';

@Component({
  selector: 'app-rdap-ext-pin-req-list',
  templateUrl: './rdap-ext-pin-req-list.component.html',
  styleUrls: ['./rdap-ext-pin-req-list.component.scss']
})
export class RdapExtPinReqListComponent implements OnInit {
  @Output() onSearchSumbit = new EventEmitter<any>();
  public panelOpenState = true;
  public configdata;
  public routedata;
  public formdata;
  public griddata;
  public baseApi;
  public searchUrl;
  public addUrl;
  public deleteUrl;
  public editUrl;
  public searchFilterData;
  public selMasterDetailsData;
  public searchOrderBy: any;

  timeOut = 500;

  searchform: FormGroup;

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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalCount: number;
  perPage: number =10;
  constructor(private httpClient: HttpClient, location: Location, private _router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private masterRegionService: RdApiMasterRegionService,
    private spinner: RdSpinnerService) {
    this.baseApi = environment.extrapinreqapiurl;
    this.searchUrl = this.baseApi + "ExtraPin/search";
    this.exportfilename = "extrapin_requested_data";
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
    // this.httpClient.get("assets/config/masterScreenSearchCommonConfig.json").subscribe(data => {
    //   this.configdata = data;

    //   this.getFormData();
    // });
    // this.appString = [];
    // this.httpClient.get("assets/config/app-string.json").subscribe(data => {
    //   this.appString = data;
    // });

    // this.httpClient.get("assets/config/stringSearchCriteria.json").subscribe(data => {
    //   this.stringSearchCriteria.push(data);
    // });
    // this.httpClient.get("assets/config/numberSearchCriteria.json").subscribe(data => {
    //   this.numberSearchCriteria.push(data);
    // })

  }

  ngOnInit(): void {
    this.spinner.show();
    this.pagename = "extrapinreqlist";
    this.appString = [];
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
    // this.spinner.hide();
    this.gridDataLoad();
  }
  onSelGridRowData(event) {
    
    this.selMasterDetailsData = event;
    //localStorage.setItem("selMasterViewData", JSON.stringify(this.selMasterDetailsData.added[0]));
  }
  viewrecord() {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('list', 'view');
    //this._router.navigate([tempUrl.toString()], { queryParams:{id:this.selMasterDetailsData.newSelection[0].planitem}}); 
    this._router.navigate([tempUrl.toString() + "/" + this.selMasterDetailsData.newSelection[0].planitem]);

  }
  gridDataLoad() {
    this.searchGridData = [];
    this.masterApiService.getData().subscribe(data => {
      if (data) {
        this.searchGridData.push(...data);
        this.totalCount = this.searchGridData.length;
        this.spinner.hide();
      }
    });
    this.masterApiService.getGridData(this.searchUrl);
  }
  public onPageChangeEvent(pageNumber: number) {
    this.spinner.show();
    this.searchParam = { pageNumber: pageNumber + 1, pageSize: this.perPage, filters: [], sorts: [] };
    
    
    this.filterparamarr = [];
    
    this.searchParam.filters = this.filterparamarr;
    this.searchParam.sorts.push({ field: "Planitem", direction: "DESC" });

         this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
           console.log("x.data",x.data);
       this.searchGridData = x.data;
       this.totalCount = x.totalRecords;
       
     });
     this.spinner.hide();
  }
}
