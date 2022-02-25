import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class RdapExtraPinRequestDetailsComponent implements OnInit, OnChanges {
  @ViewChild('select') select: NgSelectComponent;
  public baseApi;
  public channelobj: any;
  public channelarrobj: any;
  public marketarrobj: any;
  public channeltypearrobj: any;
  public regionarrobj: any;
  public studioarrobj: any;
  public pintypearrobj: any;
  public gamecomplexityarrobj: any;
  public requeststatusarrobj: any;
  public currencyarrobj: any;
  public extrapindetailsform: FormGroup;
  @Output() detailsEvent = new EventEmitter<any>();
  @Input() pinId: any;
  viewExtrapinRequestData: any;
  extraPinAPi:any;
  constructor(private httpClient: HttpClient, private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService, private snackbarInfoService: SnackbarInfoService) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    if (this.pinId != null) {
    }
  }
  ngOnInit(): void {
    this.spinner.show();
    this.loadAllddl();
    this.buildForm();
    if (this.pinId) {
    }
    this.spinner.hide();
  }
  ngOnChanges(data) {
    if (this.pinId) {
      this.getRequestPinById();
    }
  }
  getRequestPinById() {
    this.spinner.show();
    if(this.pinId != undefined && this.pinId != 'add')
    {

    
    this.masterApiService.getRequestPinById(this.extraPinAPi + "ExtraPin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.viewExtrapinRequestForm();
      this.spinner.hide();
    });
  }
  }
  public viewExtrapinRequestForm() {
    this.extrapindetailsform.controls["id"].setValue(this.viewExtrapinRequestData.data.planitem);
    this.extrapindetailsform.controls["requeststatus"].setValue(this.viewExtrapinRequestData.data.requeststatus);
    this.extrapindetailsform.controls["channelId"].setValue(this.viewExtrapinRequestData.data.channelId);
    this.extrapindetailsform.controls["channeltypeId"].setValue(this.viewExtrapinRequestData.data.channeltypeId);
    this.extrapindetailsform.controls["studioId"].setValue(this.viewExtrapinRequestData.data.studioId);
    this.extrapindetailsform.controls["marketId"].setValue(this.viewExtrapinRequestData.data.marketId);
    this.extrapindetailsform.controls["gamecomplexityId"].setValue(this.viewExtrapinRequestData.data.gamecomplexityId);
    this.extrapindetailsform.controls["pintype"].setValue(this.viewExtrapinRequestData.data.pintype);
    this.extrapindetailsform.controls["regionId"].setValue(this.viewExtrapinRequestData.data.regionId);
  
    this.extrapindetailsform.get('requeststatus').disable({ onlySelf: true });
    this.extrapindetailsform.get('channelId').disable({ onlySelf: true });
    this.extrapindetailsform.get('channeltypeId').disable({ onlySelf: true });
    this.extrapindetailsform.get('studioId').disable({ onlySelf: true });
    this.extrapindetailsform.get('marketId').disable({ onlySelf: true });
    this.extrapindetailsform.get('gamecomplexityId').disable({ onlySelf: true });
    this.extrapindetailsform.get('pintype').disable({ onlySelf: true });
    this.extrapindetailsform.get('regionId').disable({ onlySelf: true });

    // this.extrapindetailsform.controls["requeststatus"].setValue(this.viewExtrapinRequestData.data.requeststatus);
    // this.extrapindetailsform.controls["channelId"].setValue(this.viewExtrapinRequestData.data.channelId);
    // this.extrapindetailsform.controls["channeltypeId"].setValue(this.viewExtrapinRequestData.data.channeltypeId);
    // this.extrapindetailsform.controls["studioId"].setValue(this.viewExtrapinRequestData.data.studioId);
    // this.extrapindetailsform.controls["marketId"].setValue(this.viewExtrapinRequestData.data.marketId);
    // this.extrapindetailsform.controls["gamecomplexityId"].setValue(this.viewExtrapinRequestData.data.gamecomplexityId);
    // this.extrapindetailsform.controls["pintype"].setValue(this.viewExtrapinRequestData.data.pintype);
    // this.extrapindetailsform.controls["regionId"].setValue(this.viewExtrapinRequestData.data.regionId);

  }
  public buildForm() {
    this.extrapindetailsform = this.fb.group({
      id: [''],
      requeststatus: ['Req', Validators.required],
      channelId: [null,Validators.required],
      channeltypeId: [null,Validators.required],
      regionId: [null,Validators.required],
      studioId: [null,Validators.required],
      marketId: [null,Validators.required],
      pintype: [null,Validators.required],
      gamecomplexityId: [null,Validators.required]
    });
    this.extrapindetailsform.get('id').disable({ onlySelf: true });
  }
  loadAllddl() {
    this.callDdlApi();
  }
  ddlOnChangeEvent(event,formcontrolname) {
    if (formcontrolname == "channelId") {
      this.masterApiService.masterSearchDDL(this.baseApi + "channeltype/ddlbychannel/" + event.id + "/true").subscribe(data => {
        this.channeltypearrobj = [];
        this.channeltypearrobj.push(data);
        this.extrapindetailsform.controls["channeltypeId"].setValue("");
      });
    }
    else if (formcontrolname == "regionId") {
      this.masterApiService.masterSearchDDL(this.baseApi + "market/ddlbyregion/" + event.id+ "/true").subscribe(data => {
        this.marketarrobj = [];
        this.marketarrobj.push(data);
        this.extrapindetailsform.controls["marketId"].setValue("");
      });
    }
    this.detailsEvent.emit(this.extrapindetailsform);
  }
  callDdlApi() {
    this.channelarrobj = [];
    this.channeltypearrobj = [];
    this.regionarrobj = [];
    this.marketarrobj = [];
    this.studioarrobj = [];
    this.gamecomplexityarrobj = [];
    this.requeststatusarrobj = [];
    this.pintypearrobj = [];
    this.masterApiService.masterSearchDDL(this.baseApi + "channel/ddl/true").subscribe(data => {
      this.channelarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "channeltype/ddl/true").subscribe(data => {
      this.channeltypearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "region/ddl/true").subscribe(data => {
      this.regionarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "market/ddl/true").subscribe(data => {
      this.marketarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "studio/ddl/true").subscribe(data => {
      this.studioarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "gamecomplexity/ddl/true").subscribe(data => {
      this.gamecomplexityarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/pintype").subscribe(data => {
      this.pintypearrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/requeststatus").subscribe(data => {
      this.requeststatusarrobj.push(data);
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/currency").subscribe(data => {
     // this.currencyarrobj.push(data);
      //this.gamecomplexityarrobj.push(data);
    });
  }

}
