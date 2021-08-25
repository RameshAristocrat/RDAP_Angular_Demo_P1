import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { isEmptyString, _isNotEmptyString, _isNotEmptyVal } from 'src/app/package/modules/rdap-shared-components/utils/shared-utils';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from "src/environments/environment";
import { filterModel, searchParamModel } from 'src/app/package/api/model/param/searchParam';
import { marketmodel } from 'src//app/package/api/model/master/rd_model_market';
@Component({
  selector: 'app-rdap-shared-config-setuptable-addedit',
  templateUrl: './rdap-shared-config-setuptable-addedit.component.html',
  styleUrls: ['./rdap-shared-config-setuptable-addedit.component.scss']
})
export class RdapSharedConfigSetuptableAddeditComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() onSearchSumbit = new EventEmitter<any>();

  public configdata;
  public routedata;
  public formdata;
  public griddata;

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
  transactionFlag = "A";
  public baseApi;
  public addUrl;
  searchParam: searchParamModel;
  filterparam: filterModel;
  filterparamarr: filterModel[];
  searchGridData: any;
  addParam: any;
  addParamArr: any[];
  fieldprop: string;
  commonmodel: any[];

  public marketmodelobj: marketmodel;
  public marketmodelarr: marketmodel[];
  //= ['select', 'position'];

  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private httpClient: HttpClient, location: Location, router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar, private masterApiService: RdMasterApiService) {
    this.baseApi = environment.baseapiurl;
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
        if (this.route.match("add").length) {
          this.transactionFlag = "A";
        } else if (this.route.match("edit").length) {
          this.transactionFlag = "E";
        } else if (this.route.match("view").length) {
          this.transactionFlag = "v";
        }
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      } else {
        this.route = 'Home'
      }
    });
    this.httpClient.get("assets/config/masterScreenCommonAddEdit.json").subscribe(data => {
      this.configdata = data;
      this.getFormData();
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
  }
  getFormData() {
    this.formSelectApiData = [];
    if (this.route.match("channeltype") && this.route.match("channeltype").length) {
      this.formName = "channeltypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channeltype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("cabinets") && this.route.match("cabinets").length) {
      this.formName = "cabinetsSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.cabinets;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("channel") && this.route.match("channel").length) {
      this.formName = "channelSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channel;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("devefforttype") && this.route.match("devefforttype").length) {
      this.formName = "devefforttypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devefforttype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("devcomplexity") && this.route.match("devcomplexity").length > 0) {
      this.formName = "devcomplexitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devcomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("gravity") && this.route.match("gravity").length > 0) {
      this.formName = "gravitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.gravity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("devtype1") && this.route.match("devtype1").length > 0) {
      this.formName = "devtype1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("devtype2") && this.route.match("devtype2").length > 0) {
      this.formName = "devtype2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("market") && this.route.match("market").length > 0) {
      this.formName = "marketSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.market;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.addUrl = this.baseApi + this.routedata[0].addApi[0].url;
      });
      this.createFormControl();
    } else if (this.route.match("studio") && this.route.match("studio").length > 0) {
      this.formName = "studioSearchForm";
      this.configdata[0].master.fiter(x => {
        this.routedata = x.studio;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("quarter") && this.route.match("quarter").length > 0) {
      this.formName = "quarterSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.quarter;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("status1") && this.route.match("status1").length > 0) {
      this.formName = "status1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("status2") && this.route.match("status2").length > 0) {
      this.formName = "status2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("status3") && this.route.match("status3").length > 0) {
      this.formName = "status3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("prodcat1") && this.route.match("prodcat1").length > 0) {
      this.formName = "prodcat1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("prodcat2") && this.route.match("prodcat2").length > 0) {
      this.formName = "prodcat2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("prodcat3") && this.route.match("prodcat3").length > 0) {
      this.formName = "prodcat3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("epp") && this.route.match("epp").length > 0) {
      this.formName = "eppSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.epp;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route.match("version") && this.route.match("version").length > 0) {
      this.formName = "versionSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.version;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.searchform.controls[controlName].hasError(errorName);
  }
  submit() {
    this.addParamArr = [];
    // let fieldproptemp;
    // if (this.route.match("market") && this.route.match("market").length > 0) {
    //   this.marketmodelarr=[];
    //   this.marketmodelobj;
    //   console.log(this.marketmodelobj);
    // }
    this.formdata.forEach((x, index) => {
      this.fieldprop = x.field;
      this.addParam = {};
      if ((x.type == "text") && _isNotEmptyString(this.searchform.get(x.formcontrolname).value)) {
        if (x.fieldtype == "number") {
          this.addParamArr[this.fieldprop] = Number(this.searchform.get(x.formcontrolname).value);
        } else if (x.fieldtype == "boolean") {
          this.addParamArr[this.fieldprop] = Boolean(this.searchform.get(x.formcontrolname).value);
        } else if (x.fieldtype == "string") {
          this.addParamArr[this.fieldprop] = this.searchform.get(x.formcontrolname).value;
        }
      } else if ((x.type == "select") && _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)) {
        this.addParamArr[this.fieldprop] = (this.searchform.get(x.formcontrolname).value)["id"];
      } else if (x.type == "textarea") {
        this.addParamArr[this.fieldprop] = this.searchform.get(x.formcontrolname).value;
      }
    });
    this.addParamArr["isactive"] = true;
    console.log(this.addParamArr);
    debugger
    console.log(this.commonmodel);
    this.marketmodelarr=[];
    this.marketmodelarr = this.addParamArr;
    this.masterApiService.masterAdd(this.addUrl, this.marketmodelarr).subscribe(x => {
      this.searchGridData = x.data;
    });
  };
  submitold() {
    this.formGroupArr = [];
    this.gridsource = [];
    this.displayedColumns = [];
    this.loopGridContent = [];
    this.displayedColumns.push("select")
    let count = 1;
    let errorFlag = false;
    if (this.searchform.invalid) {
      return;
    }

    this.formdata.forEach((x, index) => {
      if (isEmptyString(this.searchform.get(x.formcontrolname).value)) {
        document.getElementById(x.formcontrolname).focus();
        setTimeout(() => {
          this.openSnackBar("Enter " + x.label + " !!");
          errorFlag = true;
          //this.searchform.get(x.formcontrolname).validator
        }, count * (this.timeOut + 500));
        count++;
      }
      this.formGroupArr.push({ key: x.formcontrolname, value: this.searchform.get(x.formcontrolname).value });
    });
    this.httpClient.get(this.griddata.api).subscribe(data => {
      this.gridsource.push(data);
      this.gridsource.filter(x => {
        x.filter(y => {
          if (y.pagename == this.routeName) {
            this.tempFilterData = y.data;
          };
        })
      })
      if (this.tempFilterData) {
        Object.keys(this.tempFilterData[0]).forEach(x => {
          this.displayedColumns.push(x);
          this.loopGridContent.push({ "title": x, "data": ("element." + x) });
        });
      }
    });
    //this.onSearchSumbit.emit(this.formGroupArr);
  }
  createFormControl() {
    let frmgrp = {};
    this.formdata.forEach(x => {
      if (x.type == "select") {
        let ddlurl = this.baseApi + x.api;
        this.masterApiService.masterSearchDDL(ddlurl).subscribe(data => {
          x.apidata = data;
        });
        frmgrp[x.formcontrolname] = new FormControl();
      } else {
        if (x.required == "required") {
          frmgrp[x.formcontrolname] = new FormControl('', Validators.required);
        } else {
          frmgrp[x.formcontrolname] = new FormControl('');
        }
      }

    });
    this.searchform = new FormGroup(frmgrp);
  }
  openSnackBar(errormsg: string) {
    this._snackBar.open(errormsg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
      panelClass: ['warn-snackbar']
    });
  }

}
