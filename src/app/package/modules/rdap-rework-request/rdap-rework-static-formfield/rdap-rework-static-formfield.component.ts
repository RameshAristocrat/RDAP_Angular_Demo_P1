import { Component, OnInit } from '@angular/core';
import {FormFieldDescription1, FormFieldDescription2 } from   'src/assets/config/reworkStaticData';
import { IgxColumnComponent } from 'igniteui-angular';

import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import { environment } from "src/environments/environment";
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';

@Component({
  selector: 'app-rdap-rework-static-formfield',
  templateUrl: './rdap-rework-static-formfield.component.html',
  styleUrls: ['./rdap-rework-static-formfield.component.scss']
})
export class RdapReworkStaticFormfieldComponent implements OnInit {

  public formFieldDescription1: any[];
  public formFieldDescription2: any[];
  public legendData: any[];
  public col: IgxColumnComponent;
  public pWidth: string;
  public nWidth: string;  
  public searchUrl;
  public baseApi;
  public searchParam;
  public configdata;

  constructor(private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService) {
    this.formFieldDescription1 = FormFieldDescription1;
    this.formFieldDescription2 = FormFieldDescription2;
    this.spinner.show();
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
    this.searchParam.sorts.push({ field: "Planitem", direction: "DESC" });
   this.baseApi = environment.baseapiurl;
   
  //   this.searchUrl = this.baseApi + "devtype2/search";
  //  this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
      
  //   this.legendData = x.data;
  // });
  this.spinner.hide();
   }

   public onResize(event) {
    this.col = event.column;
    this.pWidth = event.prevWidth;
    this.nWidth = event.newWidth;
}

  ngOnInit(): void {
    this.spinner.show();
    this.searchParam = { pageNumber: 0, pageSize: 0, filters: [], sorts: [] };
   this.baseApi = environment.baseapiurl;
   
    this.searchUrl = this.baseApi + "devtype2/ddlbydevtype1/BUGFIX/true";//"devtype2/search";
   
   
   this.masterApiService.getMasterDataById(this.searchUrl).subscribe(x => {
      
    this.legendData = x;
  });
  this.spinner.hide();
  }

}
