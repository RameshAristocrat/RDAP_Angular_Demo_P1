import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, Pipe, PipeTransform} from '@angular/core';
import { IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import * as appstringdata from 'src/assets/config/app-string';
import { CsvFileTypes, IColumnExportingEventArgs, IGridToolbarExportEventArgs, IgxCsvExporterOptions, IgxExcelExporterOptions, IgxExporterOptionsBase, IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { IgxGridCellComponent } from '@infragistics/igniteui-angular/lib/grids/cell.component';
import { IgxGridRowComponent } from '@infragistics/igniteui-angular/lib/grids/grid/grid-row.component';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { IgxDialogComponent } from '@infragistics/igniteui-angular';

@Component({
  selector: 'app-rdap-rework-details',
  templateUrl: './rdap-rework-details.component.html',
  styleUrls: ['./rdap-rework-details.component.scss'],
})
export class RdapReworkDetailsComponent implements OnInit, OnChanges {
  @ViewChild('select') select: NgSelectComponent;
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;

  isShown: boolean = false ; // hidden by default

  public baseApi;
  public managePinAPi;
  public prodPlanarrayobj: any;
  public prodPlanarrayobj2: any;
  public prodPlanarrayobj3: any;
  public requestStatusobj: any;
  public reworkDevtype2arryobj: any;
  public parentSelected;
  public studioarrayobj: any;
  public marketarryobj: any;
  public devtype1arryobj: any;
  public devtype2arryobj: any;
  public titlearryobj: any;
  public status3arryobj: any;
  public impactincluded: boolean = true;
  public impactanalysed: boolean = true;
  public isStatusddlDisabled: boolean = true;
  public form1parentPinData: any;
  public statusDefaultValue = "Req";
  public reworkrequestdetailsform: FormGroup;

  @Output() reworkdetailsEvent = new EventEmitter<any>();
  @Input() reworkId: any;
  
  viewExtrapinRequestData: any;
  reworkApi:any;
  message:any;
  managePinApi: any;
  accessApi: any;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
permissionData: any;

isReworkAdmin: boolean; 

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService,
    private snackbarInfoService: SnackbarInfoService
  ) {
    this.baseApi = environment.baseapiurl;
    this.reworkApi = environment.reworkreqestapi;
    this.managePinAPi = environment.extrapinreqapiurl;
    
this.accessApi = environment.userapiurl;
    
    if (this.reworkId != null) {
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.rolebasedPermission();
    this.buildForm();
    this.loadAllddl();
    if (this.reworkId) {
    }
    this.spinner.hide();
    this.statusDefaultValue = "Req";
  }

  
  ngOnChanges(data) {
    this.rolebasedPermission();
    this.buildForm();
    this.loadAllddl();
    if (this.reworkId) {
      this.getReworkRequestById();
    }
  }



  noAccessPermission()
  {
    this.notificationAlert.open();
    this.message= "You are not authorized for this module";
    
  }
  onDialogSubmit(event){
    event.dialog.close(); 
    let url = "/home/dashboard";
    this.router.navigate([url]);
  }
  
  
    rolebasedPermission()
    {
      
 this.masterApiService.getMasterDataById(this.accessApi + "Permission/IsReworkAdmin").subscribe(data => {
     
  this.isReworkAdmin = data;

      
if(!this.isReworkAdmin)
{
this.masterApiService.getMasterDataById(this.accessApi + "Permission/getbymodule/rework").subscribe(data => {

this.permissionData = data;
this.isAdd = data.isAdd;
this.isEdit = data.isEdit;
this.isDelete = data.isDelete;
this.isView = data.isView;

if(!this.reworkId && !this.isAdd)
{
  this.noAccessPermission();
}
if(this.reworkId && !this.isView)
{
  this.noAccessPermission();
}


});

}
else
{
this.isAdd = true;
this.isEdit = true;
this.isDelete = true;
this.isView = true; 
}


});
    }



  getReworkRequestById() {
    this.spinner.show();
    this.masterApiService.getRequestPinById(this.reworkApi + "Rework/" + this.reworkId).subscribe(data => {
      
      this.viewExtrapinRequestData = data;
     
      this.viewReworkRequestForm();
      this.spinner.hide();
    });
    
  }

  public viewReworkRequestForm() {
    


    this.reworkrequestdetailsform.controls['requeststatus'].setValue(this.viewExtrapinRequestData.data.requeststatus);
    this.reworkrequestdetailsform.controls['requeststatus'].disable();

    if(this.viewExtrapinRequestData.data.requeststatus == "REJD")
    {

      if(this.reworkId && !this.isEdit)
      {
        this.noAccessPermission();
      }

    this.reworkrequestdetailsform.controls['reason'].setValue(this.viewExtrapinRequestData.data.reason);
    
    this.reworkrequestdetailsform.controls['justification'].setValue(this.viewExtrapinRequestData.data.justification);
   

   this.reworkrequestdetailsform.controls['jiraLink'].setValue(this.viewExtrapinRequestData.data.jiraLink);
   

   this.reworkrequestdetailsform.controls['impactincluded'].setValue(this.viewExtrapinRequestData.data.impactincluded);
   

   this.reworkrequestdetailsform.controls['impactanalysed'].setValue(this.viewExtrapinRequestData.data.impactanalysed);
   if(this.viewExtrapinRequestData.data.impactanalysed == false)
    {
      this.isShown = true;
    }
    else{
      this.isShown=false;
    }

   
   this.reworkrequestdetailsform.controls['analysisReason'].setValue(this.viewExtrapinRequestData.data.analysisReason);
   

   
   
   this.reworkrequestdetailsform.controls['rwkId'].setValue(this.viewExtrapinRequestData.data.rwkId);
   this.reworkrequestdetailsform.controls['rwkId'].disable();

   if(this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != "0")
   {

   
   this.reworkrequestdetailsform.controls['parentplanitem1'].setValue(this.viewExtrapinRequestData.data.reworkList[0].parentplanitem);
   this.reworkrequestdetailsform.controls['parentplanitem1'].disable();

   this.reworkrequestdetailsform.controls['planitem'].setValue(this.viewExtrapinRequestData.data.reworkList[0].planitem);
   this.reworkrequestdetailsform.controls['planitem'].disable();
   this.masterApiService
   .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[0].parentplanitem)
   .subscribe((data) => {
     this.form1parentPinData = data;
     this.viewParentPinForm1(false);
     this.spinner.hide();
   });
   
   
  //  this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
   
  //  this.masterApiService
  //  .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[0].parentplanitem)
  //  .subscribe((sdata) => {
  //    this.form1parentPinData = sdata;
     
  //    this.viewParentPinForm1();
  //    this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  //    this.spinner.hide();
  //  });

   
   this.reworkrequestdetailsform.controls['isinstalled'].setValue(this.viewExtrapinRequestData.data.reworkList[0].isinstalled);
   

   this.reworkrequestdetailsform.controls['devtype1Id'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype1Id);
   
   this.reworkrequestdetailsform.controls['isinstalled'].enable();
   this.reworkrequestdetailsform.controls['devtype2Id'].enable();

   
   this.reworkrequestdetailsform.controls['devtype2Id'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype2Id);
   
   
   this.reworkrequestdetailsform.controls['devtype2Idold'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype1Id);
   


  }
  if(this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != "0")
  { 
  this.reworkrequestdetailsform.controls['parentplanitem2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].parentplanitem);
  this.reworkrequestdetailsform.controls['parentplanitem2'].disable();

  
  this.reworkrequestdetailsform.controls['planitem2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].planitem);
  this.reworkrequestdetailsform.controls['planitem2'].disable();

  this.masterApiService
  .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[1].parentplanitem)
  .subscribe((data) => {
    this.form1parentPinData = data;
    this.viewParentPinForm2(false);
    this.spinner.hide();
  });
 
  // this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
   
  //  this.masterApiService
  //  .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[1].parentplanitem)
  //  .subscribe((data) => {
  //    this.form1parentPinData = data;
  //    this.viewParentPinForm2();
  //    this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  //    this.spinner.hide();
  //  });
   
   this.reworkrequestdetailsform.controls['isinstalled2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].isinstalled);
   
   
   this.reworkrequestdetailsform.controls['devtype1Id2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype1Id);
   

   this.reworkrequestdetailsform.controls['isinstalled2'].enable();
      this.reworkrequestdetailsform.controls['devtype2Id2'].enable();
   
   this.reworkrequestdetailsform.controls['devtype2Id2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype2Id);
   

   

   this.reworkrequestdetailsform.controls['devtype2Idold2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype1Id);
   
   
  }
  if(this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != "0")
  { 
  this.reworkrequestdetailsform.controls['parentplanitem3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].parentplanitem);
  this.reworkrequestdetailsform.controls['parentplanitem3'].disable();

  
  this.reworkrequestdetailsform.controls['planitem3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].planitem);
  this.reworkrequestdetailsform.controls['planitem3'].disable();

  this.masterApiService
  .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[2].parentplanitem)
  .subscribe((data) => {
    this.form1parentPinData = data;
    this.viewParentPinForm3(false);
    this.spinner.hide();
  });

  // this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  //  this.masterApiService
  //  .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[2].parentplanitem)
  //  .subscribe((data) => {
  //    this.form1parentPinData = data;
  //    this.viewParentPinForm3();
  //    this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  //    this.spinner.hide();
  //  });
   
   this.reworkrequestdetailsform.controls['isinstalled3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].isinstalled);
   

   this.reworkrequestdetailsform.controls['devtype1Id3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype1Id);
   
   
   this.reworkrequestdetailsform.controls['isinstalled3'].enable();
   this.reworkrequestdetailsform.controls['devtype2Id3'].enable();


   this.reworkrequestdetailsform.controls['devtype2Idold3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype1Id);
   
   
   this.reworkrequestdetailsform.controls['devtype2Id3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype2Id);
   

  }






    }
    else{

 

    this.reworkrequestdetailsform.controls['reason'].setValue(this.viewExtrapinRequestData.data.reason);
    this.reworkrequestdetailsform.controls['reason'].disable();

    this.reworkrequestdetailsform.controls['justification'].setValue(this.viewExtrapinRequestData.data.justification);
   this.reworkrequestdetailsform.controls['justification'].disable();

   this.reworkrequestdetailsform.controls['jiraLink'].setValue(this.viewExtrapinRequestData.data.jiraLink);
   this.reworkrequestdetailsform.controls['jiraLink'].disable();

   this.reworkrequestdetailsform.controls['impactincluded'].setValue(this.viewExtrapinRequestData.data.impactincluded);
   this.reworkrequestdetailsform.controls['impactincluded'].disable();

   this.reworkrequestdetailsform.controls['impactanalysed'].setValue(this.viewExtrapinRequestData.data.impactanalysed);
   this.reworkrequestdetailsform.controls['impactanalysed'].disable();

   if(this.viewExtrapinRequestData.data.impactanalysed == false)
    {
      this.isShown = true;
    }
    else{
      this.isShown=false;
    }

   
   this.reworkrequestdetailsform.controls['analysisReason'].setValue(this.viewExtrapinRequestData.data.analysisReason);
   this.reworkrequestdetailsform.controls['analysisReason'].disable();

   
   
   this.reworkrequestdetailsform.controls['rwkId'].setValue(this.viewExtrapinRequestData.data.rwkId);
   this.reworkrequestdetailsform.controls['rwkId'].disable();

   this.reworkrequestdetailsform.controls['parentplanitem1'].disable();
   this.reworkrequestdetailsform.controls['parentplanitem2'].disable();
   this.reworkrequestdetailsform.controls['parentplanitem3'].disable();

   if(this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[0].parentplanitem != "0")
   {

   
   this.reworkrequestdetailsform.controls['parentplanitem1'].setValue(this.viewExtrapinRequestData.data.reworkList[0].parentplanitem);
   this.reworkrequestdetailsform.controls['parentplanitem1'].disable();
   
   this.reworkrequestdetailsform.controls['planitem'].setValue(this.viewExtrapinRequestData.data.reworkList[0].planitem);
   this.reworkrequestdetailsform.controls['planitem'].disable();
   this.masterApiService
   .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[0].parentplanitem)
   .subscribe((data) => {
     this.form1parentPinData = data;
     this.viewParentPinForm1(false);
     this.spinner.hide();
   });

   
   this.reworkrequestdetailsform.controls['isinstalled'].setValue(this.viewExtrapinRequestData.data.reworkList[0].isinstalled);
   this.reworkrequestdetailsform.controls['isinstalled'].disable();

   this.reworkrequestdetailsform.controls['devtype1Id'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype1Id'].disable();

   
   this.reworkrequestdetailsform.controls['devtype2Id'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype2Id);
   this.reworkrequestdetailsform.controls['devtype2Id'].disable();
   
   this.reworkrequestdetailsform.controls['devtype2Idold'].setValue(this.viewExtrapinRequestData.data.reworkList[0].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype2Idold'].disable();


  }
  if(this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[1].parentplanitem != "0")
  { 
  this.reworkrequestdetailsform.controls['parentplanitem2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].parentplanitem);
   this.reworkrequestdetailsform.controls['parentplanitem2'].disable();

   
   this.reworkrequestdetailsform.controls['planitem2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].planitem);
   this.reworkrequestdetailsform.controls['planitem2'].disable();
   
   this.masterApiService
   .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[1].parentplanitem)
   .subscribe((data) => {
     this.form1parentPinData = data;
     this.viewParentPinForm2(false);
     this.spinner.hide();
   });
   
   this.reworkrequestdetailsform.controls['isinstalled2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].isinstalled);
   this.reworkrequestdetailsform.controls['isinstalled2'].disable();
   
   this.reworkrequestdetailsform.controls['devtype1Id2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype1Id2'].disable();

   
   this.reworkrequestdetailsform.controls['devtype2Id2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype2Id);
   this.reworkrequestdetailsform.controls['devtype2Id2'].disable();

   

   this.reworkrequestdetailsform.controls['devtype2Idold2'].setValue(this.viewExtrapinRequestData.data.reworkList[1].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype2Idold2'].disable();
   
  }
  if(this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != null || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != "undefined" || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != 0 || this.viewExtrapinRequestData.data.reworkList[2].parentplanitem != "0")
  { 
  this.reworkrequestdetailsform.controls['parentplanitem3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].parentplanitem);
   this.reworkrequestdetailsform.controls['parentplanitem3'].disable();
   
   this.reworkrequestdetailsform.controls['planitem3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].planitem);
   this.reworkrequestdetailsform.controls['planitem3'].disable();

   this.masterApiService
   .getRequestPinById(this.managePinAPi + 'ManagePin/' + this.viewExtrapinRequestData.data.reworkList[2].parentplanitem)
   .subscribe((data) => {
     this.form1parentPinData = data;
     this.viewParentPinForm3(false);
     this.spinner.hide();
   });
   
   this.reworkrequestdetailsform.controls['isinstalled3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].isinstalled);
   this.reworkrequestdetailsform.controls['isinstalled3'].disable();

   this.reworkrequestdetailsform.controls['devtype1Id3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype1Id3'].disable();
   
   this.reworkrequestdetailsform.controls['devtype2Idold3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype1Id);
   this.reworkrequestdetailsform.controls['devtype2Idold3'].disable();
   
   this.reworkrequestdetailsform.controls['devtype2Id3'].setValue(this.viewExtrapinRequestData.data.reworkList[2].devtype2Id);
   this.reworkrequestdetailsform.controls['devtype2Id3'].disable();

  }
  
}
   

   




this.reworkrequestdetailsform.controls['parentplanitem1'].disable();
this.reworkrequestdetailsform.controls['parentplanitem2'].disable();
this.reworkrequestdetailsform.controls['parentplanitem3'].disable();
this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  

  }
  parentDdlOnChangeEvent1(args) {
    
    if (args === undefined) {
      this.clearForm();
    } 
    
    else {
      this.spinner.show();
      this.masterApiService
        .getRequestPinById(this.managePinAPi + 'ManagePin/' + args.id)
        .subscribe((data) => {
         
          this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== args.id);
          this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== args.id);
          this.form1parentPinData = data;
          this.viewParentPinForm1(true);
          this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
          this.spinner.hide();
        });
    }
  }

  parentDdlOnChangeEvent2(args) {
    if (args === undefined) {
      this.clearForm2();
    } else {
      this.spinner.show();
      this.masterApiService
        .getRequestPinById(this.managePinAPi + 'ManagePin/' + args.id)
        .subscribe((data) => {
          this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== args.id);
          this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== args.id);
          this.form1parentPinData = data;
          this.viewParentPinForm2(true);
          this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
          this.spinner.hide();
        });
    }
  }

  parentDdlOnChangeEvent3(args) {
    if (args === undefined) {
      this.clearForm3();
    } else {
      this.spinner.show();
      this.masterApiService
        .getRequestPinById(this.managePinAPi + 'ManagePin/' + args.id)
        .subscribe((data) => {
          this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== args.id);
          this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== args.id);

          this.form1parentPinData = data;
          this.viewParentPinForm3(true);
          this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
          this.spinner.hide();
        });
    }
  }


  public disableviewParentPinForm() {
    this.reworkrequestdetailsform.controls['rwkId'].disable();

    this.reworkrequestdetailsform.controls['planitem'].disable();
    this.reworkrequestdetailsform.controls['planitem2'].disable();
    this.reworkrequestdetailsform.controls['planitem3'].disable();


    this.reworkrequestdetailsform.controls['marketId'].reset();
    this.reworkrequestdetailsform.controls['marketId'].disable();

    this.reworkrequestdetailsform.controls['studioId'].reset();
    this.reworkrequestdetailsform.controls['studioId'].disable();

    this.reworkrequestdetailsform.controls['programno'].reset();
    this.reworkrequestdetailsform.controls['programno'].disable();

    this.reworkrequestdetailsform.controls['titleId'].reset();
    this.reworkrequestdetailsform.controls['titleId'].disable();

    
    this.reworkrequestdetailsform.controls['actualApprDate'].reset();
    this.reworkrequestdetailsform.controls['actualApprDate'].disable();

    this.reworkrequestdetailsform.controls['devtype1Id'].reset();
    this.reworkrequestdetailsform.controls['devtype1Id'].disable();

    this.reworkrequestdetailsform.controls['devtype2Idold'].reset();
    this.reworkrequestdetailsform.controls['devtype2Idold'].disable();
    
    this.reworkrequestdetailsform.controls['devtype2Id'].reset();
    this.reworkrequestdetailsform.controls['devtype2Id'].disable();

    this.reworkrequestdetailsform.controls['status3Id'].reset();
    this.reworkrequestdetailsform.controls['status3Id'].disable();

    this.reworkrequestdetailsform.controls['approvedDate'].reset();
    this.reworkrequestdetailsform.controls['approvedDate'].disable();

   
    this.reworkrequestdetailsform.controls['isinstalled'].reset();
    this.reworkrequestdetailsform.controls['isinstalled'].disable();

    this.reworkrequestdetailsform.controls['marketId2'].reset();
    this.reworkrequestdetailsform.controls['marketId2'].disable();

    this.reworkrequestdetailsform.controls['studioId2'].reset();
    this.reworkrequestdetailsform.controls['studioId2'].disable();

    this.reworkrequestdetailsform.controls['programno2'].reset();
    this.reworkrequestdetailsform.controls['programno2'].disable();

    this.reworkrequestdetailsform.controls['titleId2'].reset();
    this.reworkrequestdetailsform.controls['titleId2'].disable();
    
    this.reworkrequestdetailsform.controls['actualApprDate2'].reset();
    this.reworkrequestdetailsform.controls['actualApprDate2'].disable();

    this.reworkrequestdetailsform.controls['devtype1Id2'].reset();
    this.reworkrequestdetailsform.controls['devtype1Id2'].disable();

    this.reworkrequestdetailsform.controls['devtype2Idold2'].reset();
    this.reworkrequestdetailsform.controls['devtype2Idold2'].disable();
    
    this.reworkrequestdetailsform.controls['devtype2Id2'].reset();
    this.reworkrequestdetailsform.controls['devtype2Id2'].disable();

    this.reworkrequestdetailsform.controls['status3Id2'].reset();
    this.reworkrequestdetailsform.controls['status3Id2'].disable();

    this.reworkrequestdetailsform.controls['approvedDate2'].reset();
    this.reworkrequestdetailsform.controls['approvedDate2'].disable();

   
    this.reworkrequestdetailsform.controls['isinstalled2'].reset();
    this.reworkrequestdetailsform.controls['isinstalled2'].disable();

    this.reworkrequestdetailsform.controls['marketId3'].reset();
    this.reworkrequestdetailsform.controls['marketId3'].disable();

    this.reworkrequestdetailsform.controls['studioId3'].reset();
    this.reworkrequestdetailsform.controls['studioId3'].disable();

    this.reworkrequestdetailsform.controls['programno3'].reset();
    this.reworkrequestdetailsform.controls['programno3'].disable();

    this.reworkrequestdetailsform.controls['titleId3'].reset();
    this.reworkrequestdetailsform.controls['titleId3'].disable();
    
    this.reworkrequestdetailsform.controls['actualApprDate3'].reset();
    this.reworkrequestdetailsform.controls['actualApprDate3'].disable();

    this.reworkrequestdetailsform.controls['devtype1Id3'].reset();
    this.reworkrequestdetailsform.controls['devtype1Id3'].disable();

    this.reworkrequestdetailsform.controls['devtype2Idold3'].reset();
    this.reworkrequestdetailsform.controls['devtype2Idold3'].disable();
    
    this.reworkrequestdetailsform.controls['devtype2Id3'].reset();
    this.reworkrequestdetailsform.controls['devtype2Id3'].disable();

    this.reworkrequestdetailsform.controls['status3Id3'].reset();
    this.reworkrequestdetailsform.controls['status3Id3'].disable();

    this.reworkrequestdetailsform.controls['approvedDate3'].reset();
    this.reworkrequestdetailsform.controls['approvedDate3'].disable();

   
    this.reworkrequestdetailsform.controls['isinstalled3'].reset();
    this.reworkrequestdetailsform.controls['isinstalled3'].disable();

  }

  public clearForm() {
    this.reworkrequestdetailsform.controls['rwkId'].disable();
    this.reworkrequestdetailsform.controls['marketId'].reset();
    this.reworkrequestdetailsform.controls['marketId'].disable();

    this.reworkrequestdetailsform.controls['studioId'].reset();
    this.reworkrequestdetailsform.controls['studioId'].disable();

    this.reworkrequestdetailsform.controls['programno'].reset();
    this.reworkrequestdetailsform.controls['programno'].disable();

    this.reworkrequestdetailsform.controls['titleId'].reset();
    this.reworkrequestdetailsform.controls['titleId'].disable();

    
    this.reworkrequestdetailsform.controls['actualApprDate'].reset();
    this.reworkrequestdetailsform.controls['actualApprDate'].disable();

    this.reworkrequestdetailsform.controls['devtype1Id'].reset();
    this.reworkrequestdetailsform.controls['devtype1Id'].disable();

    this.reworkrequestdetailsform.controls['devtype2Idold'].reset();
    this.reworkrequestdetailsform.controls['devtype2Idold'].disable();
    
    this.reworkrequestdetailsform.controls['devtype2Id'].reset();
    this.reworkrequestdetailsform.controls['devtype2Id'].disable();

    this.reworkrequestdetailsform.controls['status3Id'].reset();
    this.reworkrequestdetailsform.controls['status3Id'].disable();

    this.reworkrequestdetailsform.controls['approvedDate'].reset();
    this.reworkrequestdetailsform.controls['approvedDate'].disable();

   
    this.reworkrequestdetailsform.controls['isinstalled'].reset();
    this.reworkrequestdetailsform.controls['isinstalled'].disable();

    

  }

  clearForm2()
  {
    this.reworkrequestdetailsform.controls['marketId2'].reset();
    this.reworkrequestdetailsform.controls['marketId2'].disable();

    this.reworkrequestdetailsform.controls['studioId2'].reset();
    this.reworkrequestdetailsform.controls['studioId2'].disable();

    this.reworkrequestdetailsform.controls['programno2'].reset();
    this.reworkrequestdetailsform.controls['programno2'].disable();

    this.reworkrequestdetailsform.controls['titleId2'].reset();
    this.reworkrequestdetailsform.controls['titleId2'].disable();
    
    this.reworkrequestdetailsform.controls['actualApprDate2'].reset();
    this.reworkrequestdetailsform.controls['actualApprDate2'].disable();

    this.reworkrequestdetailsform.controls['devtype1Id2'].reset();
    this.reworkrequestdetailsform.controls['devtype1Id2'].disable();

    this.reworkrequestdetailsform.controls['devtype2Idold2'].reset();
    this.reworkrequestdetailsform.controls['devtype2Idold2'].disable();
    
    this.reworkrequestdetailsform.controls['devtype2Id2'].reset();
    this.reworkrequestdetailsform.controls['devtype2Id2'].disable();

    this.reworkrequestdetailsform.controls['status3Id2'].reset();
    this.reworkrequestdetailsform.controls['status3Id2'].disable();

    this.reworkrequestdetailsform.controls['approvedDate2'].reset();
    this.reworkrequestdetailsform.controls['approvedDate2'].disable();

   
    this.reworkrequestdetailsform.controls['isinstalled2'].reset();
    this.reworkrequestdetailsform.controls['isinstalled2'].disable();

  }

clearForm3()
{
  
  this.reworkrequestdetailsform.controls['marketId3'].reset();
  this.reworkrequestdetailsform.controls['marketId3'].disable();

  this.reworkrequestdetailsform.controls['studioId3'].reset();
  this.reworkrequestdetailsform.controls['studioId3'].disable();

  this.reworkrequestdetailsform.controls['programno3'].reset();
  this.reworkrequestdetailsform.controls['programno3'].disable();

  this.reworkrequestdetailsform.controls['titleId3'].reset();
  this.reworkrequestdetailsform.controls['titleId3'].disable();
  
  this.reworkrequestdetailsform.controls['actualApprDate3'].reset();
  this.reworkrequestdetailsform.controls['actualApprDate3'].disable();

  this.reworkrequestdetailsform.controls['devtype1Id3'].reset();
  this.reworkrequestdetailsform.controls['devtype1Id3'].disable();

  this.reworkrequestdetailsform.controls['devtype2Idold3'].reset();
  this.reworkrequestdetailsform.controls['devtype2Idold3'].disable();
  
  this.reworkrequestdetailsform.controls['devtype2Id3'].reset();
  this.reworkrequestdetailsform.controls['devtype2Id3'].disable();

  this.reworkrequestdetailsform.controls['status3Id3'].reset();
  this.reworkrequestdetailsform.controls['status3Id3'].disable();

  this.reworkrequestdetailsform.controls['approvedDate3'].reset();
  this.reworkrequestdetailsform.controls['approvedDate3'].disable();

 
  this.reworkrequestdetailsform.controls['isinstalled3'].reset();
  this.reworkrequestdetailsform.controls['isinstalled3'].disable();
}





  

  resetCalculations()
  {
   this.clearForm();
  }

  resetCalculations2()
  {
   this.clearForm2();
  }


  resetCalculations3()
  {
   this.clearForm3();
  }

  public viewParentPinForm1(allowchange) {
    
    this.reworkrequestdetailsform.controls['parentplanitem1'].setValue(this.form1parentPinData.data.planitem);
    
    if(!allowchange)
    {
      this.reworkrequestdetailsform.controls['parentplanitem1'].disable();
    }
    
    this.reworkrequestdetailsform.controls['planitem'].disable();
    this.reworkrequestdetailsform.controls['marketId'].setValue(this.form1parentPinData.data.marketId);
    

    this.reworkrequestdetailsform.controls['studioId'].setValue(this.form1parentPinData.data.studioId);
    

    this.reworkrequestdetailsform.controls['titleId'].setValue(this.form1parentPinData.data.titleId);
    
    this.reworkrequestdetailsform.controls['actualApprDate'].setValue(this.form1parentPinData.data.actualApprDate);

     this.reworkrequestdetailsform.controls["programno"].setValue(this.form1parentPinData.data.programno);
    
     this.reworkrequestdetailsform.controls["devtype1Id"].setValue(this.form1parentPinData.data.devtype1Id);
    
    this.reworkrequestdetailsform.controls["devtype2Idold"].setValue(this.form1parentPinData.data.devtype2Id);
    
    if(allowchange)
    {
      
     this.reworkrequestdetailsform.controls["isinstalled"].setValue(false);
     this.reworkrequestdetailsform.controls['isinstalled'].enable();
      this.reworkrequestdetailsform.controls['devtype2Id'].enable();
    }
    
     
     this.reworkrequestdetailsform.controls["status3Id"].setValue(this.form1parentPinData.data.status3Id);
    
     this.reworkrequestdetailsform.controls["approvedDate"].setValue(this.form1parentPinData.data.approvedDate);
    
   
  }

  public viewParentPinForm2(allowchange) {
    this.reworkrequestdetailsform.controls['parentplanitem2'].setValue(this.form1parentPinData.data.planitem);
    
    if(!allowchange)
    {
      this.reworkrequestdetailsform.controls['parentplanitem2'].disable();
    }
    this.reworkrequestdetailsform.controls['planitem2'].disable();
    this.reworkrequestdetailsform.controls['marketId2'].setValue(this.form1parentPinData.data.marketId);
    
    this.reworkrequestdetailsform.controls['studioId2'].setValue(this.form1parentPinData.data.studioId);
    
    this.reworkrequestdetailsform.controls['titleId2'].setValue(this.form1parentPinData.data.titleId);
    
    this.reworkrequestdetailsform.controls['actualApprDate2'].setValue(this.form1parentPinData.data.actualApprDate);

    this.reworkrequestdetailsform.controls["programno2"].setValue(this.form1parentPinData.data.programno);
    
    this.reworkrequestdetailsform.controls["devtype1Id2"].setValue(this.form1parentPinData.data.devtype1Id);
    
    this.reworkrequestdetailsform.controls["devtype2Idold2"].setValue(this.form1parentPinData.data.devtype2Id);
    
     this.reworkrequestdetailsform.controls["status3Id2"].setValue(this.form1parentPinData.data.status3Id);
    
     this.reworkrequestdetailsform.controls["approvedDate2"].setValue(this.form1parentPinData.data.approvedDate);
     
    if(allowchange)
    {
      
     this.reworkrequestdetailsform.controls["isinstalled2"].setValue(false);
     this.reworkrequestdetailsform.controls['isinstalled2'].enable();
      this.reworkrequestdetailsform.controls['devtype2Id2'].enable();
    }

  }

  public viewParentPinForm3(allowchange) {
    this.reworkrequestdetailsform.controls['parentplanitem3'].setValue(this.form1parentPinData.data.planitem);
    
    if(!allowchange)
    {
      this.reworkrequestdetailsform.controls['parentplanitem3'].disable();
    }
    
    this.reworkrequestdetailsform.controls['planitem3'].disable();
    this.reworkrequestdetailsform.controls['marketId3'].setValue(this.form1parentPinData.data.marketId);
    
    this.reworkrequestdetailsform.controls['studioId3'].setValue(this.form1parentPinData.data.studioId);
    
    this.reworkrequestdetailsform.controls['titleId3'].setValue(this.form1parentPinData.data.titleId);
    
    this.reworkrequestdetailsform.controls['actualApprDate3'].setValue(this.form1parentPinData.data.actualApprDate);

     this.reworkrequestdetailsform.controls["programno3"].setValue(this.form1parentPinData.data.programno);
    
    this.reworkrequestdetailsform.controls["devtype1Id3"].setValue(this.form1parentPinData.data.devtype1Id);
    
    
    this.reworkrequestdetailsform.controls["devtype2Idold3"].setValue(this.form1parentPinData.data.devtype2Id);
    
     this.reworkrequestdetailsform.controls["status3Id"].setValue(this.form1parentPinData.data.status3Id);

     this.reworkrequestdetailsform.controls["approvedDate3"].setValue(this.form1parentPinData.data.approvedDate);
    
    if(allowchange)
    {
      
     this.reworkrequestdetailsform.controls["isinstalled3"].setValue(false);
     this.reworkrequestdetailsform.controls['isinstalled3'].enable();
      this.reworkrequestdetailsform.controls['devtype2Id3'].enable();
    }
  
  }

  ddlOnChangeEvent(args) {
    
    if(this.reworkrequestdetailsform.controls['impactanalysed'].value == false)
    {
      this.isShown = true;
    }
    else{
      this.isShown=false;
    }
    
    this.reworkdetailsEvent.emit(this.reworkrequestdetailsform);
  }

  public buildForm() {
this.reworkrequestdetailsform = this.fb.group({
  requeststatus: "Req",
  impactincluded: false,
  impactanalysed: true,
  jiraLink:'',
  reason:'',
  justification:'',
  analysisReason:'',
  rwkId:'New',
  planitem:'New',
  planitem2:'New',
  planitem3:'New',
  gdbreqdby: '',
      parentplanitem1: null,
      marketId: null,
      studioId: null,
      programno: null,
      titleId: null,
      actualApprDate:null,
      devtype1Id: null,
      devtype2Id: null,
      devtype2Idold: null,
      status3Id: null,
      approvedDate: null,
      isinstalled: false,
      parentplanitem2: null,
      marketId2: null,
      studioId2: null,
      programno2: null,
      titleId2: null,
      actualApprDate2:null,
      devtype1Id2: null,
      devtype2Id2: null,
      devtype2Idold2: null,
      status3Id2: null,
      approvedDate2: null,
      isinstalled2: false,
      parentplanitem3: null,
      marketId3: null,
      studioId3: null,
      programno3: null,
      titleId3: null,
      actualApprDate3:null,
      devtype1Id3: null,
      devtype2Id3: null,
      devtype2Idold3: null,
      status3Id3: null,
      approvedDate3: null,
      isinstalled3: false,
    

});

    
    this.disableviewParentPinForm();
  }
  loadAllddl() {
    this.callDdlApi();
  }

  callDdlApi() {
    this.prodPlanarrayobj = [];
    this.prodPlanarrayobj2 = [];
    this.prodPlanarrayobj3 = [];
    this.requestStatusobj = [];
    this.studioarrayobj = [];
    this.marketarryobj = [];
    this.devtype2arryobj = [];
    this.status3arryobj = [];
    this.titlearryobj = [];
    this.devtype1arryobj = [];
    this.reworkDevtype2arryobj = [];

    // this.masterApiService
    //   .masterSearchDDL(this.managePinAPi + 'ManagePin/ddl')
    //   .subscribe((data) => {
    //     this.prodPlanarrayobj.push(data);
    //   });
    this.masterApiService
    .masterSearchDDL(this.reworkApi + 'Rework/parentplanitemddl')
    .subscribe((data) => {
      // this.prodPlanarrayobj.push(data);
      // this.prodPlanarrayobj2.push(data);
      // this.prodPlanarrayobj3.push(data);
      this.prodPlanarrayobj[0] = data;
      this.prodPlanarrayobj2[0] = data;
      this.prodPlanarrayobj3[0] = data;

      // this.prodPlanarrayobj = [...this.prodPlanarrayobj, data];
      // this.prodPlanarrayobj = this.prodPlanarrayobj[0];
      // this.prodPlanarrayobj2 = [...this.prodPlanarrayobj2, data];
      // this.prodPlanarrayobj2 = this.prodPlanarrayobj2[0];
      // this.prodPlanarrayobj3 = [...this.prodPlanarrayobj3, data];
      // this.prodPlanarrayobj3 = this.prodPlanarrayobj3[0];


    });


      this.masterApiService
      .masterSearchDDL(this.baseApi + 'Master/ddl/requeststatus')
      .subscribe((data) => {
        this.requestStatusobj.push(data);
      });

      this.reworkrequestdetailsform.controls['requeststatus'].setValue("Req");
      this.reworkrequestdetailsform.get('requeststatus').disable();
      

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'market/ddl')
      .subscribe((data) => {
        this.marketarryobj.push(data);
      });

      

      this.masterApiService
      .masterSearchDDL(this.baseApi + 'devtype2/ddlbydevtype1/BUGFIX/true')
      .subscribe((data) => {
        this.reworkDevtype2arryobj.push(data);
      });

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'studio/ddl')
      .subscribe((data) => {
        this.studioarrayobj.push(data);
      });

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'DevType2/ddl')
      .subscribe((data) => {
        this.devtype2arryobj.push(data);
      });

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'Status3/ddl')
      .subscribe((data) => {
        this.status3arryobj.push(data);
      });

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'DevType1/ddl')
      .subscribe((data) => {
        this.devtype1arryobj.push(data);
      });

    this.masterApiService
      .masterSearchDDL(this.baseApi + 'title/ddl')
      .subscribe((data) => {
        this.titlearryobj.push(data);
      });
  }



  customSearchFn(args) {

    var numberValue = Number(args.term);

    let val1 = this.reworkrequestdetailsform.controls['parentplanitem2'].value;
    let val2 = this.reworkrequestdetailsform.controls['parentplanitem3'].value;
    if (val1 == null) {
      val1 = "";
    }
    if (val2 == null) {
      val2 = "";
    }
    if (args.term != val1.toString() && args.term != val2.toString()) {
      // this.spinner.show();
      let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;


      this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
        this.prodPlanarrayobj[0] = x;
        this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== val1);
        this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== val2);
        // this.spinner.hide();
      });
    }
    else {

      this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== numberValue);
      // this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== numberValue);
    }
    this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== numberValue);
    this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== numberValue);
    //term = term.toLocaleLowerCase();


    // return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.countryName.toLocaleLowerCase().indexOf(term) > -1;
  }
  customSearchFn2(args) {
    var numberValue = Number(args.term);
    let val1 = this.reworkrequestdetailsform.controls['parentplanitem1'].value;
    let val2 = this.reworkrequestdetailsform.controls['parentplanitem3'].value;
    if (val1 == null) {
      val1 = "";
    }
    if (val2 == null) {
      val2 = "";
    }
    if (args.term != val1.toString() && args.term != val2.toString()) {
      //this.spinner.show();
      let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;


      this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
        this.prodPlanarrayobj2[0] = x;
        this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== val1);
        this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== val2);
        // this.spinner.hide();
      });
    }
    else {

      // this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== numberValue);
      this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== numberValue);
    }
    this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== numberValue);
    this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== numberValue);

    // return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.countryName.toLocaleLowerCase().indexOf(term) > -1;
  }
  customSearchFn3(args) {
    var numberValue = Number(args.term);
    let val1 = this.reworkrequestdetailsform.controls['parentplanitem2'].value;
    let val2 = this.reworkrequestdetailsform.controls['parentplanitem1'].value;

    if (val1 == null) {
      val1 = "";
    }
    if (val2 == null) {
      val2 = "";
    }
    if (args.term != val1.toString() && args.term != val2.toString()) {
      // this.spinner.show();
      let tempextraPinAPi = environment.extrapinreqapiurl + "managepin/ddl/" + args.term;


      this.masterApiService.masterSearchDDL(tempextraPinAPi).subscribe(x => {
        this.prodPlanarrayobj3[0] = x;
        this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== val1);
        this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== val2);
        // this.spinner.hide();
      });
    }
    else {

      this.prodPlanarrayobj3[0] = this.prodPlanarrayobj3[0].filter(item => item.id !== numberValue);
      // this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== numberValue);
    }
    this.prodPlanarrayobj[0] = this.prodPlanarrayobj[0].filter(item => item.id !== numberValue);
    this.prodPlanarrayobj2[0] = this.prodPlanarrayobj2[0].filter(item => item.id !== numberValue);

    // return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.countryName.toLocaleLowerCase().indexOf(term) > -1;
  }
    

}

@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    
    return collection.filter((item) =>
      item.toString().toLowerCase().startsWith(term.toString().toLowerCase())
    );
  }
}
