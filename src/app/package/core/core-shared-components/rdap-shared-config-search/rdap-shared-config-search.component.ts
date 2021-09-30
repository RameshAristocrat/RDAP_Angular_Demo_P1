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
import { isNotEmptyString, _isNotEmptyString, _isNotEmptyVal } from '../../utils/shared-utils';
import { isNotNull } from '@igniteui/material-icons-extended';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import * as numbersearchdata from 'src/assets/config/numberSearchCriteria';
import * as stringsearchdata from 'src/assets/config/stringSearchCriteria';
import { BehaviourSubjectService } from '../../services/behaviour-subject.service';
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
@Component({
  selector: 'app-rdap-shared-config-search',
  templateUrl: './rdap-shared-config-search.component.html',
  styleUrls: ['./rdap-shared-config-search.component.scss']
})

export class RdapSharedConfigSearchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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
  public searchOrderBy:any;

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
  searchGridData: any;
  appString: any;
  searchParam: searchParamModel;
  sortparam:sortModel;
  sortparamarr:sortModel[];
  filterparam: filterModel;
  filterparamarr: filterModel[];
  stringSearchCriteria: any[];
  numberSearchCriteria: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient, location: Location, private _router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private masterRegionService: RdApiMasterRegionService, 
    private behaviourService: BehaviourSubjectService,private spinner: RdSpinnerService) {
    console.log("environment.baseapiurl", environment.baseapiurl);
    this.baseApi = environment.baseapiurl;
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
    //   console.log(data)
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

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.appString = [];
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
      console.log(this.configdata)
      this.getFormData();
    }
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
      console.log("this.appString", this.appString)
    }
    if (numbersearchdata.numberSearch) {
      this.numberSearchCriteria = numbersearchdata.numberSearch;
    }
    if (stringsearchdata.stringSearch) {
      this.stringSearchCriteria = stringsearchdata.stringSearch;
    }
    this.spinner.hide();
    //appstringdata
  }
  getFormData() {
    this.formSelectApiData = [];
    this.sortparam = {field:"",direction:""};
    this.sortparamarr=[];
    if (this.route.match("studio") && this.route.match("studio").length > 0) {
      this.exportfilename = "studio_master_data";
      this.formName = "studioSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.studio;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"StudioId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("version") && this.route.match("version").length > 0) {
      this.exportfilename = "version_master_data";
      this.formName = "versionSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.version;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"versionId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("epp") && this.route.match("epp").length > 0) {
      this.exportfilename = "epp_master_data";
      this.formName = "eppSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.EPP;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"eppId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("region") && this.route.match("region").length > 0) {
      //this.searchUrl = this.baseApi;
      this.exportfilename = "region_master_data";
      this.formName = "regionSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.region;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"regionId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("pool") && this.route.match("pool").length > 0) {
      this.exportfilename = "pool_master_data";
      this.formName = "poolSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.pool;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"poolId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("prodcat1") && this.route.match("prodcat1").length > 0) {
      this.exportfilename = "prodcat1_master_data";
      this.formName = "prodcat1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"prodcat1Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("prodcat2") && this.route.match("prodcat2").length > 0) {
      this.exportfilename = "prodcat2_master_data";
      this.formName = "prodcat2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"prodcat2Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("prodcat3") && this.route.match("prodcat3").length > 0) {
      this.exportfilename = "prodcat3_master_data";
      this.formName = "prodcat3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"prodcat3Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("status1") && this.route.match("status1").length > 0) {
      this.exportfilename = "status1_master_data";
      this.formName = "status1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"status1Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("status2") && this.route.match("status2").length > 0) {
      this.exportfilename = "status2_master_data";
      this.formName = "status2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"status2Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("status3") && this.route.match("status3").length > 0) {
      this.exportfilename = "status3_master_data";
      this.formName = "status3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"status3Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("gravity") && this.route.match("gravity").length > 0) {
      this.exportfilename = "gravity_master_data";
      this.formName = "gravitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.gravity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"gravityId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("devtype1") && this.route.match("devtype1").length > 0) {
      this.exportfilename = "devtype1_master_data";
      this.formName = "devtype1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"devtype1Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("devtype2") && this.route.match("devtype2").length > 0) {
      this.exportfilename = "devtype2_master_data";
      this.formName = "devtype2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"devtype2Id",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("channeltype") && this.route.match("channeltype").length > 0) {
      this.exportfilename = "channeltype_master_data";
      this.formName = "channeltypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channeltype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"channeltypeId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("cabinets") && this.route.match("cabinets").length > 0) {
      this.exportfilename = "cabinets_master_data";
      this.formName = "cabinetsSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.cabinets;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"cabinetId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
       // this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("channel") && this.route.match("channel").length > 0) {
      this.exportfilename = "channel_master_data";
      this.formName = "channelSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channel;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"channelId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("devefforttype") && this.route.match("devefforttype").length > 0) {
      this.exportfilename = "devefforttype_master_data";
      this.formName = "devefforttypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devefforttype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"devefforttypeId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("devcomplexity") && this.route.match("devcomplexity").length > 0) {
      this.exportfilename = "devcomplexity_master_data";
      this.formName = "devcomplexitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devcomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"devcomplexityId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
       // this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("market") && this.route.match("market").length > 0) {
      this.exportfilename = "market_master_data";
      this.formName = "marketSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.market;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"marketId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        //this.gridDataLoad();
      });
      this.createFormControl();
    } else if (this.route.match("quarter") && this.route.match("quarter").length > 0) {
      this.exportfilename = "quarter_master_data";
      this.formName = "quarterSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.quarter;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam={field:"quarterId",direction:"ASC"};
        this.sortparamarr.push(this.sortparam);
        this.gridDataLoad();
      });
      this.createFormControl();
    }
  }
  generateParam() {
    // this.param = {
    //   pageNumber: 0,
    //   pageSize: 0,
    //   filters: [
    //     {
    //       field: "Region",
    //       operator: "Contains",
    //       value: ""
    //     }
    //   ]
    // }
  }
  submit() {
    this.spinner.show();
    console.log(this.formdata);
    console.log(this.searchform);
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.filterparamarr = [];
    this.searchParam.sorts=this.sortparamarr;
    this.formdata.forEach((x, index) => {
      console.log(this.searchform.get(x.searchcriteria.formcontrolname).value);
      this.filterparam = { field: "", operator: "", value: "" };
      if ((x.type == "text" || x.type == "textarea") && _isNotEmptyString(this.searchform.get(x.formcontrolname).value)) {
        console.log(this.searchform.get(x.formcontrolname).value);
        this.filterparam.field = x.field;
        this.filterparam.operator = (this.searchform.get(x.searchcriteria.formcontrolname).value).toString();
        this.filterparam.value = (this.searchform.get(x.formcontrolname).value).toString();
        this.filterparamarr.push(this.filterparam);
        console.log(this.filterparamarr);
        this.searchParam.filters = this.filterparamarr;
      } else if ((x.type == "select") && _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)) {
        console.log(this.searchform.get(x.formcontrolname).value);
        this.filterparam.field = x.field;
        this.filterparam.operator = (this.searchform.get(x.searchcriteria.formcontrolname).value).toString();
        this.filterparam.value = (this.searchform.get(x.formcontrolname).value).toString();
        this.filterparamarr.push(this.filterparam);
        console.log(this.filterparamarr);
        this.searchParam.filters = this.filterparamarr;
      }
    });
    this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
      this.searchGridData = x.data;
    });
    this.spinner.hide();
  };
  submitold() {
    this.formGroupArr = [];
    this.gridsource = [];
    this.displayedColumns = [];
    this.loopGridContent = [];
    this.displayedColumns.push("select");
    let count = 1;
    let errorFlag = false;
    let temp = this.masterRegionService.regionSearch().subscribe(x => {
      console.log(x);
    });
    console.log(temp);
    if (this.searchform.invalid) {
      return;
    }
    this.searchGridData = [];
    this.gridsource = [];
    this.httpClient.get("assets/config/search-data-mockup.json").subscribe(data => {
      this.gridsource.push(data);
      this.gridsource.filter(x => {
        x.filter(y => {
          if ("studio" == y.pagename) {
            this.searchGridData = y.data;
            console.log("this.searchGridData= y", this.searchGridData);
          };
        })
      });
    });
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.searchform.controls[controlName].hasError(errorName);
  }
  createFormControl() {
    let frmgrp = {};
    this.formdata.forEach(x => {
      if (x.type == "select") {
        let ddlurl = this.baseApi + x.api;
        this.masterApiService.masterSearchDDL(ddlurl).subscribe(data => {
          x.apidata = data;
        });
        frmgrp[x.formcontrolname] = new FormControl('');
        frmgrp[x.searchcriteria.formcontrolname] = new FormControl('Contains');
      } else {
        if (x.required == "required") {
          frmgrp[x.formcontrolname] = new FormControl('', Validators.required);
        } else {
          frmgrp[x.formcontrolname] = new FormControl('');
        }
        frmgrp[x.searchcriteria.formcontrolname] = new FormControl('Contains');
      }

    });
    this.searchform = new FormGroup(frmgrp);
    this.spinner.hide();
  }
  openSnackBar(errormsg: string) {
    this._snackBar.open(errormsg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
      panelClass: ['warn-snackbar']
    });
  }
  addnewrecord(url) {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('search', 'add');
    console.log(tempUrl)
    this._router.navigate([tempUrl.toString()]);
  }
  viewrecord(url) {
    let tempUrl;
    let selMasterData;
    debugger
    tempUrl = this.route.replace('search', 'view');
    console.log(tempUrl);
    console.log(this.selMasterDetailsData);
    debugger
    this._router.navigate([tempUrl.toString()]);

  }
  cancel(url) {
    this._router.navigate([url]);
  }
  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
    localStorage.setItem("selMasterViewData",JSON.stringify(this.selMasterDetailsData.added[0]));
  }
  reset(){
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.filterparamarr = [];
    this.searchParam.sorts=this.sortparamarr;
    this.createFormControl();
    this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
      this.searchGridData = x.data;
    });
  }
  gridDataLoad(){
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.filterparamarr = [];
    this.searchParam.sorts=this.sortparamarr;
    this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
      this.searchGridData = x.data;
    });
  }
}

