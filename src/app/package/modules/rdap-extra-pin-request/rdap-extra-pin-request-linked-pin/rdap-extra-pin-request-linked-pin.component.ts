import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IBaseChipEventArgs, IgxComboComponent, IgxDialogComponent } from '@infragistics/igniteui-angular';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { environment } from "src/environments/environment";
import { Moment } from 'moment';
import * as moment from 'moment';
import { IgxGridRowComponent } from 'igniteui-angular/lib/grids/grid/grid-row.component';
import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
@Component({
  selector: 'app-rdap-extra-pin-request-linked-pin',
  templateUrl: './rdap-extra-pin-request-linked-pin.component.html',
  styleUrls: ['./rdap-extra-pin-request-linked-pin.component.scss']
})
export class RdapExtraPinRequestLinkedPinComponent implements OnInit,OnChanges {
  @ViewChild('select') select: NgSelectComponent;
  @ViewChild('remoteCombo', { read: IgxComboComponent, static: true }) public remoteCombo: IgxComboComponent; 
  @ViewChild('withValueKey', { read: IgxComboComponent })
  public comboValueKey: IgxComboComponent;

 @ViewChild('selectdependency', { static: false }) public selectdependency: NgSelectComponent;
  @ViewChild('selectlinkedpin') selectlinkedpin: NgSelectComponent;
  @ViewChild('selectimpactedpin') selectimpactedpin: NgSelectComponent;
  @ViewChild('decimalalert', { static: true }) public notificationAlert: IgxDialogComponent;
  dependencyddldata:any;
  message: any;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  numRegex_atf = /^-?\d*[.,]?\d{0,1}$/;
  public baseApi;
  public extrapinbaseApi;
  public linkedpinsobj: any;
  public linkedpinsarrobj: any;
  public impactedpinsobj: any;
  public impactedpinsarrobj: any[];
  public fyarrobj: any;
  public quarterarrobj: any;
  public currencyarrobj: any;
  public extralinkedpindetailsform: FormGroup;
  public revenuePrice: number;
  public chkImpCurShed: boolean = true;
  showSelected: boolean = false;
  // public cities: { name: string, id: string }[] = [
  //   { name: 'Sofia', id: 'BG01' }, { name: 'London', id: 'UK01' }];
  //   public selectedCities:{ name: string, id: string }[] = [this.cities[0], this.cities[1]];
    // public selectedValueKey: string[] = ['UK01', 'BG01'];

    public selectedValueKey: any;
    public selectedValueKeyImpacted: any;

  public term: any;
  public myDisabledCondition:boolean;
  @Input() pinId:any;
  @Input() dependencyInput: any;
  viewExtrapinRequestData:any;
  @Output() linkedPinEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private router: Router,
    public fb: FormBuilder, private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService, private snackbarInfoService: SnackbarInfoService,
    private cdr: ChangeDetectorRef) {
    this.linkedpinsarrobj = [];
    this.baseApi = environment.baseapiurl;
    this.extrapinbaseApi = environment.extrapinreqapiurl;
  }
  ngOnInit(): void {
   
     
    this.loadAllddl();
  
    this.buildForm();
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

    
    this.masterApiService.getRequestPinById(this.extrapinbaseApi + "ExtraPin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.viewExtrapinRequestForm();
      this.spinner.hide();
    });
  }
  }
  public viewExtrapinRequestForm() {
    this.showSelected = true;
   
        this.linkedpinsarrobj = this.viewExtrapinRequestData.data.linkedPinDDL;
       this.impactedpinsarrobj =this.viewExtrapinRequestData.data.impactedPinDDL;
       this.selectedValueKey=this.viewExtrapinRequestData.data.linkedPins;
    
       this.selectedValueKeyImpacted = this.viewExtrapinRequestData.data.impactedPins;
       this.extralinkedpindetailsform.controls["linkedPins"].setValue(this.viewExtrapinRequestData.data.linkedPins);
    this.extralinkedpindetailsform.controls["impactToCurrentSchedules"].setValue(this.viewExtrapinRequestData.data.impactToCurrentSchedules);
    this.extralinkedpindetailsform.controls["impactedPins"].setValue(this.viewExtrapinRequestData.data.impactedPins);
    this.extralinkedpindetailsform.controls["marketingreqdate"].setValue(this.viewExtrapinRequestData.data.marketingreqdate);
    this.extralinkedpindetailsform.controls["financialyearId"].setValue(this.viewExtrapinRequestData.data.financialyearId);
    this.extralinkedpindetailsform.controls["quarterId"].setValue(this.viewExtrapinRequestData.data.quarterId);
    this.extralinkedpindetailsform.controls["unitsforecast"].setValue(this.viewExtrapinRequestData.data.unitsforecast);
    this.extralinkedpindetailsform.controls["revenuecurrency"].setValue(this.viewExtrapinRequestData.data.revenuecurrency);
    this.extralinkedpindetailsform.controls["revenueforecast"].setValue(this.viewExtrapinRequestData.data.revenueforecast);
    this.extralinkedpindetailsform.controls["incrementalToPlan"].setValue(this.viewExtrapinRequestData.data.incrementalToPlan);
    this.extralinkedpindetailsform.controls["developmentDeviation"].setValue(this.viewExtrapinRequestData.data.developmentDeviation);
    this.extralinkedpindetailsform.controls["revenueAddedToLe"].setValue(this.viewExtrapinRequestData.data.revenueAddedToLe);
  
    this.extralinkedpindetailsform.get('linkedPins').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('impactToCurrentSchedules').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('impactedPins').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('marketingreqdate').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('financialyearId').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('quarterId').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('unitsforecast').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('revenuecurrency').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('revenueforecast').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('incrementalToPlan').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('developmentDeviation').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('revenueAddedToLe').disable({ onlySelf: true });
  }
  public buildForm() {
    this.extralinkedpindetailsform = this.fb.group({
      id: [''],
      linkedPins: [],
      impactToCurrentSchedules: true,
      impactedPins: [],
      marketingreqdate: [null,Validators.required],
      financialyearId: [null,Validators.required],
      quarterId: [null,Validators.required],
      unitsforecast: 0,
      revenuecurrency: "",
      revenueforecast: 0,
      incrementalToPlan: true,
      developmentDeviation: "",
      revenueAddedToLe: true,
    });
    
    this.extralinkedpindetailsform.get('financialyearId').disable({ onlySelf: true });
    this.extralinkedpindetailsform.get('quarterId').disable({ onlySelf: true });
    // this.extralinkedpindetailsform.controls['financialyearId'].disable();
    
    // this.extralinkedpindetailsform.controls['quarterId'].disable();
  }
  loadAllddl() {
    this.callDdlApi();
  }
  ddlOnChangeEvent(args) {
    this.linkedPinEvent.emit(this.extralinkedpindetailsform);
  }
  ddlfocus($event: Event) {
    $event.stopPropagation();
  }
  
  callDdlApi() {
    this.linkedpinsarrobj = [];
    this.impactedpinsarrobj = [];
    this.fyarrobj = [];
    this.quarterarrobj = [];
    this.currencyarrobj=[];
    this.masterApiService.masterSearchDDL(this.baseApi + "FinancialYear/ddl").subscribe(data => {
      this.fyarrobj = [...this.fyarrobj, data];
      this.fyarrobj = this.fyarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "Quarter/ddl").subscribe(data => {
      this.quarterarrobj = [...this.quarterarrobj, data];
      this.quarterarrobj = this.quarterarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.baseApi + "master/ddl/currency").subscribe(data => {
      this.currencyarrobj = [...this.currencyarrobj, data];
      this.currencyarrobj = this.currencyarrobj[0];
    });
    this.masterApiService.masterSearchDDL(this.extrapinbaseApi + "managepin/ddl/").subscribe(data => {
     
      // this.impactedpinsarrobj = [...this.impactedpinsarrobj, data];
      // this.impactedpinsarrobj = this.impactedpinsarrobj[0];
      // this.linkedpinsarrobj = [...this.linkedpinsarrobj, data];
      // this.linkedpinsarrobj = this.linkedpinsarrobj[0];
      this.linkedpinsarrobj[0] = data;
      this.impactedpinsarrobj[0] = data;
    });
  }


   netApprovalFunc(event) {
    //debugger
  //   this.extralinkedpindetailsform.value[formctrlname] = moment(event.value).format("YYYY-MM-DD");
  //   this.extralinkedpindetailsform[formctrlname] = moment(event.value).format("YYYY-MM-DD");
  //  // this.emitData = { data: null, flag: false };
    let linkedpinParam = {
      mrd: this.extralinkedpindetailsform.value.marketingreqdate,
      tad: null,
      ead: null,
      aad: null
    }
    this.masterApiService.masterSearch(this.extrapinbaseApi + "PinMilestone/getfyquarternad",linkedpinParam).subscribe(res => {
      
      if(res.data.financialyearId == 0 && res.data.quarterId > 0)
      {
        this.notificationAlert.open();
        this.message= "Financial year is not configured with selected date. Kindly configure it from masters!";
      }
      else if (res.data.financialyearId > 0 && res.data.quarterId == 0)
      {
        this.notificationAlert.open();
        this.message= "Quarter is not configured with selected date. Kindly configure it from masters!";
      }
      else if (res.data.financialyearId == 0 && res.data.quarterId == 0)
      {
        this.notificationAlert.open();
        this.message= "Quarter and Financial year is not configured with selected date. Kindly configure it from masters!";
      }
      else{

        this.extralinkedpindetailsform.controls["financialyearId"].setValue(res.data.financialyearId);
        this.extralinkedpindetailsform.controls["quarterId"].setValue(res.data.quarterId);
      }
     
      this.linkedPinEvent.emit(this.extralinkedpindetailsform);

      
    });

  }

 

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    
    if ((charCode > 31 && (charCode < 48 || charCode > 57))&& charCode != 46) {
      this.notificationAlert.open();
          this.message= "Please enter decimal value!";
      return false;
    }
    return true;

  }
  numberOnlyQA(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
      this.notificationAlert.open();
          this.message= "Please enter numeric value!";
      return false;
    }
    return true;

  }
  onDialogSubmit(event){
    event.dialog.close(); 
   
  }

  

      customSearchFn(args) {

          let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;
          this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
           this.linkedpinsarrobj[0] = x;
          });
       
      }
      customSearchFnImpacted(args) {

        let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;
        this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
         this.impactedpinsarrobj[0] = x;
        });
     
    }

}
