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
import * as masteraddeditdata from 'src/assets/config/masterScreenCommonAddEdit';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
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
  public editflag;
  public addflag;

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
  public getMasterDataUrl;
  public editFieldProp;
  searchParam: searchParamModel;
  filterparam: filterModel;
  filterparamarr: filterModel[];
  searchGridData: any;
  addParam: any;
  addParamArr: any[];
  fieldprop: string;
  commonviewmodel: any[];
  selMasterDetails: any;
  public marketmodelobj: marketmodel;
  public marketmodelarr: marketmodel[];
  //= ['select', 'position'];

  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private httpClient: HttpClient, private location: Location, private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar, 
    private masterApiService: RdMasterApiService, private spinner:RdSpinnerService,private snackbarInfoService:SnackbarInfoService) {
    this.baseApi = environment.baseapiurl;
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.route = this.location.path();
        if (this.route.match("add")) {
          this.transactionFlag = "A";
        } else if (this.route && this.route.match("edit")) {
          this.transactionFlag = "E";
        } else if (this.route && this.route.match("view")) {
          this.transactionFlag = "V";
        }
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      } else {
        this.route = 'Home'
      }
    });
    // this.httpClient.get("assets/config/masterScreenCommonAddEdit.json").subscribe(data => {
    //   this.configdata = data;
    //   this.getFormData();
    // });
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.spinner.show();
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.route = this.location.path();
        if (this.route.match("add").length) {
          this.transactionFlag = "A";
          this.addflag=true;
          this.editflag=false;
        } else if (this.route && this.route.match("edit").length) {
          this.transactionFlag = "E";
          this.addflag=false;
          this.editflag=true;
        } else if (this.route && this.route.match("view").length) {
          this.transactionFlag = "V";
          this.addflag=false;
          this.editflag=false;
        }
        this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      } else {
        this.route = 'Home'
      }
    });
    if (masteraddeditdata.masteraddedit) {
      this.configdata = masteraddeditdata.masteraddedit;
      this.getFormData();
    }
  }
  getFormData() {
    this.formSelectApiData = [];
    this.editFieldProp="";
    let masterDataId;
    if (this.route && this.route.match("market") && this.route.match("market").length > 0) {
      this.formName = "marketSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.market;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.addUrl = this.baseApi + this.routedata[0].addApi[0].url;
        this.getMasterDataUrl = this.baseApi+this.routedata[0].editApi[0].url;
        this.editFieldProp=this.routedata[0].editApi[0].fieldprop;
      });
      this.createFormControl();
      if (this.transactionFlag == "V") {
        this.selMasterDetails = JSON.parse(localStorage.getItem("selMasterViewData"));
        masterDataId = this.selMasterDetails.added[0][this.editFieldProp];
        this.getMasterDataUrl=this.getMasterDataUrl+"/"+masterDataId;
        this.getMasterDataById(this.getMasterDataUrl);
      }
    } else if (this.route && this.route.match("region") && this.route.match("region").length > 0) {
      this.formName = "regionSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.region;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.addUrl = this.baseApi + this.routedata[0].addApi[0].url;
        this.getMasterDataUrl = this.baseApi+this.routedata[0].editApi[0].url;
        this.editFieldProp=this.routedata[0].editApi[0].fieldprop;
      });
      this.createFormControl();
      if (this.transactionFlag == "V") {
        this.selMasterDetails = JSON.parse(localStorage.getItem("selMasterViewData"));
        masterDataId = this.selMasterDetails.added[0][this.editFieldProp];
        this.getMasterDataUrl=this.getMasterDataUrl+"/"+masterDataId;
        this.getMasterDataById(this.getMasterDataUrl);
      }
    } else if (this.route && this.route.match("channeltype") && this.route.match("channeltype").length) {
      this.formName = "channeltypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channeltype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("cabinets") && this.route.match("cabinets").length) {
      this.formName = "cabinetsSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.cabinets;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("channel") && this.route.match("channel").length) {
      this.formName = "channelSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.channel;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("devefforttype") && this.route.match("devefforttype").length) {
      this.formName = "devefforttypeSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devefforttype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("devcomplexity") && this.route.match("devcomplexity").length > 0) {
      this.formName = "devcomplexitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devcomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("gravity") && this.route.match("gravity").length > 0) {
      this.formName = "gravitySearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.gravity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("devtype1") && this.route.match("devtype1").length > 0) {
      this.formName = "devtype1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("devtype2") && this.route.match("devtype2").length > 0) {
      this.formName = "devtype2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.devtype2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("studio") && this.route.match("studio").length > 0) {
      this.formName = "studioSearchForm";
      this.configdata[0].master.fiter(x => {
        this.routedata = x.studio;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("quarter") && this.route.match("quarter").length > 0) {
      this.formName = "quarterSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.quarter;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("status1") && this.route.match("status1").length > 0) {
      this.formName = "status1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("status2") && this.route.match("status2").length > 0) {
      this.formName = "status2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("status3") && this.route.match("status3").length > 0) {
      this.formName = "status3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.status3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("prodcat1") && this.route.match("prodcat1").length > 0) {
      this.formName = "prodcat1SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("prodcat2") && this.route.match("prodcat2").length > 0) {
      this.formName = "prodcat2SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("prodcat3") && this.route.match("prodcat3").length > 0) {
      this.formName = "prodcat3SearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.prodcat3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("epp") && this.route.match("epp").length > 0) {
      this.formName = "eppSearchForm";
      this.configdata[0].master.filter(x => {
        this.routedata = x.epp;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
      });
      this.createFormControl();
    } else if (this.route && this.route.match("version") && this.route.match("version").length > 0) {
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
    this.spinner.show();
    this.addParamArr = [];
    this.commonviewmodel = [];
    let successFlag=false;
    let redirectUrl="";
    this.commonviewmodel.push({});
    this.formdata.forEach((x, index) => {
      Object.assign(this.commonviewmodel[0], { [x.field]: "" });
    });
    this.formdata.forEach((x, index) => {
      this.fieldprop = x.field;
      this.addParam = {};
      if ((x.type == "text") && _isNotEmptyString(this.searchform.get(x.formcontrolname).value)) {
        if (x.fieldtype == "number") {
          Object.assign(this.commonviewmodel[0], { [x.field]: Number(this.searchform.get(x.formcontrolname).value)});
        } else if (x.fieldtype == "boolean") {
          Object.assign(this.commonviewmodel[0], { [x.field]: Boolean(this.searchform.get(x.formcontrolname).value)});
        } else if (x.fieldtype == "string") {
          Object.assign(this.commonviewmodel[0], { [x.field]: this.searchform.get(x.formcontrolname).value});
        }
      } else if ((x.type == "select") && _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)) {
        Object.assign(this.commonviewmodel[0], { [x.field]: Number((this.searchform.get(x.formcontrolname).value))});
      } else if (x.type == "textarea") {
        Object.assign(this.commonviewmodel[0], { [x.field]: this.searchform.get(x.formcontrolname).value});
      } else if (x.type == "checkbox") {
        Object.assign(this.commonviewmodel[0], { [x.field]: Boolean(this.searchform.get(x.formcontrolname).value)});
      }
    });
    if(this.transactionFlag=='A'){
      this.masterApiService.masterAdd(this.addUrl, this.commonviewmodel[0]).subscribe(x => {
        successFlag=x.isSuccess;
        if(x.isSuccess){
          this.snackbarInfoService.openSucessSnackBar(x.message);
          this.cancel();
        }
      });
    }else if(this.transactionFlag=='V'){
      this.masterApiService.masterUpdate(this.getMasterDataUrl, this.commonviewmodel[0]).subscribe(x => {
        successFlag=x.isSuccess;
        if(x.isSuccess){
          this.snackbarInfoService.openSucessSnackBar(x.message);
          this.cancel();
        }
      });
    }
    this.spinner.hide();
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
      }if (x.type == "checkbox") {
        frmgrp[x.formcontrolname] = new FormControl(true);
      } else {
        if (x.required == "required") {
          frmgrp[x.formcontrolname] = new FormControl('', Validators.required);
        } else {
          frmgrp[x.formcontrolname] = new FormControl('');
        }
      }

    });
    this.searchform = new FormGroup(frmgrp);
    this.spinner.hide();
  }
  openSnackBar(errormsg: string) {
    this._snackBar.open(errormsg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
      panelClass: ['warn-snackbar']
    });
  }
  getMasterDataById(url){
    this.spinner.show();
    this.masterApiService.getMasterDataById(url).subscribe(data => {
      //x.apidata = data;
      console.log("getMasterDataById",data);
      this.setViewFormControl(data.data);
    });
  }
  setViewFormControl(editFormData) {
    this.formdata.forEach((x, index) => {
      if ((x.type == "text")||(x.type == "textarea")) {
        if (x.fieldtype == "number") {
          this.searchform.controls[x.formcontrolname].setValue(Number(editFormData[x.field]));
          //this.searchform.controls[x.formcontrolname].disable();
        } else if (x.fieldtype == "boolean") {
          this.searchform.controls[x.formcontrolname].setValue(Boolean(editFormData[x.field]));
          //this.searchform.controls[x.formcontrolname].disable();
        } else if (x.fieldtype == "string") {
          this.searchform.controls[x.formcontrolname].setValue(editFormData[x.field]);
          //this.searchform.controls[x.formcontrolname].disable();
        }
      } else if ((x.type == "select")) {
        (this.searchform.get(x.formcontrolname) as FormControl).setValue(editFormData[x.field]);
        //this.searchform.controls[x.formcontrolname].setValue(Number(editFormData[x.field]));
        //this.searchform.controls[x.formcontrolname].disable();
      } else if (x.type == "checkbox") {
        this.searchform.controls[x.formcontrolname].setValue(Boolean(editFormData[x.field]));
        //this.searchform.controls[x.formcontrolname].disable();
      }
      
    });
    this.spinner.hide();
  };
delete(){
  this.spinner.show();
  console.log(this.getMasterDataUrl);
  this.masterApiService.deleteMasterDataById(this.getMasterDataUrl).subscribe(data => {
    console.log(this.getMasterDataUrl);
    if(data.isSuccess){
      this.snackbarInfoService.openSucessSnackBar(data.message);
    }
    this.cancel();
  });
  this.spinner.hide();
}
  cancel(){
    let tempUrl;
    if(this.transactionFlag=="V" || this.transactionFlag=="E"){
      tempUrl = this.route.replace('view', 'search');
    }
    if(this.transactionFlag=="A"){
      tempUrl = this.route.replace('add', 'search');
    }
    this.router.navigate([tempUrl.toString()]);
  }
}