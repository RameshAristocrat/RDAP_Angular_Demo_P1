import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-rdap-extra-pin-request-details',
  templateUrl: './rdap-extra-pin-request-details.component.html',
  styleUrls: ['./rdap-extra-pin-request-details.component.scss']
})
export class RdapExtraPinRequestDetailsComponent implements OnInit {
  @ViewChild('select') select: NgSelectComponent;
  public baseApi;
  public channelobj:any;
  public channelarrobj:any;
  public marketarrobj:any;
  public channeltypearrobj:any;
  public regionarrobj:any;
  public studioarrobj:any;
  public pintypearrobj:any;
  public gamecomplexityarrobj:any;
  requestStatusObj = [
    {id: 1, name: 'Requested'},
    {id: 2, name: 'Rejected'}
];
channelObj = [
  {id: 1, name: 'class 2 stepper'},
  {id: 2, name: 'class 3 stepper'}
];
channelTypeObj = [
  {id: 1, name: 'for sale'},
  {id: 2, name: 'for lease'}
];
regionObj = [
  {id: 1, name: 'ANZ'},
  {id: 2, name: 'IND'},
  {id: 3, name: 'PKZ'}
];
marketObj = [
  {id: 1, name: 'NSW'},
  {id: 2, name: 'COL'},
  {id: 3, name: 'TVS'}
];
studioObj = [
  {id: 1, name: 'Bash Studio'},
  {id: 2, name: 'JPL Studio'},
];
pinTypeObj = [
  {id: 1, name: 'OG'},
  {id: 2, name: 'OH'},
];
gameComplexityObj = [
  {id: 1, name: 'High'},
  {id: 2, name: 'Low'},
];
selectedCity: any;
selectedCityIds: string[];
selectedCityName = 'Vilnius';
selectedCityId: number;
selectedUserIds: number[];
  constructor(private httpClient: HttpClient,private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar, 
    private masterApiService: RdMasterApiService,
     private spinner:RdSpinnerService,private snackbarInfoService:SnackbarInfoService) { 
    this.baseApi = environment.baseapiurl;
  }
  ngOnInit(): void {
    this.loadAllddl();
  }
  loadAllddl(){
    this.callDdlApi();
  }

  callDdlApi(){
    this.channelarrobj=[];
    this.channeltypearrobj=[];
    this.regionarrobj=[];
    this.marketarrobj=[];
    this.studioarrobj=[];
    this.gamecomplexityarrobj=[];
    this.masterApiService.masterSearchDDL(this.baseApi+"channel/ddl").subscribe(data => {
      this.channelarrobj.push(data);
      console.log("data",this.channelarrobj);
    });
    this.masterApiService.masterSearchDDL(this.baseApi+"channeltype/ddl").subscribe(data => {
      this.channeltypearrobj.push(data);
      console.log("data",this.channelarrobj);
    });
    this.masterApiService.masterSearchDDL(this.baseApi+"region/ddl").subscribe(data => {
      this.regionarrobj.push(data);
      console.log("data",this.channelarrobj);
    });
    this.masterApiService.masterSearchDDL(this.baseApi+"market/ddl").subscribe(data => {
      this.marketarrobj.push(data);
      console.log("data",this.channelarrobj);
    });
    this.masterApiService.masterSearchDDL(this.baseApi+"studio/ddl").subscribe(data => {
      this.studioarrobj.push(data);
      console.log("data",this.channelarrobj);
    });
    this.masterApiService.masterSearchDDL(this.baseApi+"gamecomplexity/ddl").subscribe(data => {
      this.gamecomplexityarrobj.push(data);
      console.log("data",this.channelarrobj);
    });
  }

}
