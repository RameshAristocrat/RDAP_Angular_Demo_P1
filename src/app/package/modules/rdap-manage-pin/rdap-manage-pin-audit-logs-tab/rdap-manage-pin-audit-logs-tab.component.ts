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
import * as appstringdata from 'src/assets/config/app-string-managepin';
import { IgxGridRowComponent } from 'igniteui-angular/lib/grids/grid/grid-row.component';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
import { debug } from 'console';

@Component({
  selector: 'app-rdap-manage-pin-audit-logs-tab',
  templateUrl: './rdap-manage-pin-audit-logs-tab.component.html',
  styleUrls: ['./rdap-manage-pin-audit-logs-tab.component.scss']
})
export class RdapManagePinAuditLogsTabComponent implements OnInit,OnChanges {
  @ViewChild('linkedpingrid', { static: false }) public linkedpingrid: IgxGridComponent;
  @ViewChild('impactedpingrid', { static: false }) public impactedpingrid: IgxGridComponent;
  baseApi: any;
  extraPinAPi: any;
  route: any;
  routeName: any;
  pinId: any;
  viewExtrapinRequestData: any;
  searchParam: any;
  searchUrl: any;
  linkedpindetails: any;
  auditlogdata:any;
  changelogdata:any;
  impactedpindata:any;
  exportfilename: string;
  appString: any;
  configdata: any;
  selMasterDetailsData: any;
  linkedpinDdlData: any;
  inttesterDdlData: any;
  setitemUrl: any;
  inttesterUrl: any;
  testerPlandata: any[];
  linkedpindetailsArrObj: any[];
  data: any[];
  othersform: FormGroup;
  linkedpinUrl:any;
  impactedpinUrl:any;
  auditlogUrl:any;
  changelogUrl:any;
  @Output() auditlogEvent = new EventEmitter<any>();
  @Input() planitem: any;
  @Input() saveflag: any;
  pagename:any;
  auditlogpagename:any;
  changelogpagename:any;
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.viewExtrapinRequestData = this.planitem;
  }

  ngOnInit(): void {
    this.auditlogpagename = "auditlog";
    this.changelogpagename = "changelog";
    this.viewExtrapinRequestData = this.planitem;
    this.pinId = this.planitem.data.planitem;
    // this.getTestDetails();
    this.spinner.show();
    this.appString = [];
    this.data = [];
    //this.loadDdlApi();
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
    }
    if (appstringdata.appStringManagepin) {
      this.appString = appstringdata.appStringManagepin;
    }
    this.spinner.hide();
    this.gridDataLoad();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.gridDataLoad();
  }
  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
    //localStorage.setItem("selMasterViewData", JSON.stringify(this.selMasterDetailsData.added[0]));
  }

  gridDataLoad() {
    if(this.pinId != undefined)
    {
      this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
      this.searchParam.sorts.push({field: "Planitem",direction: "DESC"});
      this.searchParam.filters.push({
        field: "planitem",
        operator: "Equal",
        value: this.pinId.toString()
      });
      this.auditlogUrl = this.extraPinAPi + "managepin/search";
      this.impactedpinUrl = this.extraPinAPi + "ManagePinAudit/getbyplanitem/"+this.pinId;
      this.changelogUrl = this.extraPinAPi + "MangePinChangeLog/getbyplanitem/"+this.pinId;
      this.masterApiService.getMasterDataById(this.impactedpinUrl).subscribe(x => {
        if(x.length>0){
          this.auditlogdata= x;
        }else{
          this.auditlogdata=[];
        }
      });
      this.masterApiService.getMasterDataById(this.changelogUrl).subscribe(x => {
        if(x.length>0){
          this.changelogdata= x;
        }else{
          this.changelogdata=[];
        }
      });
    }
    

    //changelogdata
  }

  loadDdlApi() {
    // this.linkedpinUrl = this.baseApi + "linkedpin/ddl";
    // this.masterApiService.masterSearchDDL(this.linkedpinUrl).subscribe(x => {
    //   this.linkedpinDdlData = x;
    // });



    this.linkedpinUrl = this.extraPinAPi+"linkedpin/search";
    let newsearchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    newsearchParam.sorts.push({field: "Planitem",direction: "DESC"});
    this.masterApiService.masterSearch(this.linkedpinUrl, this.searchParam).subscribe(x => {
      this.linkedpinDdlData = x;
    });


  }

  editDone(data) {
    this.linkedpindetailsArrObj = [];
    this.linkedpingrid.data.forEach(x => {
      this.linkedpindetailsArrObj.push({ description: x.description, setitemId: x.setitemid, descrLong: x.descrLong })
    });
    this.auditlogEvent.emit(this.linkedpindetailsArrObj);
    // this.commongridmodel.filter(x=>{
    //   x[field].push(event.newSelection.value["id"]);{griddata:this.gameTitleArrObj, busjustify:this.gametitleform}
    // });
  }
  
  onchangeSelect(event, cell, data, field) {
    let row: IgxGridRowComponent = cell.row;
    row.cells.forEach(function (cell: IgxGridCellComponent) {
      if (cell.column.field === "description") {
        cell.update(event.newSelection.value.description);
      }
      else if (cell.column.field === "setitemid") {
        cell.update(event.newSelection.value.id);
      }else if (cell.column.field === "descrLong") {
        cell.update(event.newSelection.value.description2);
      }
    });
  }
}


