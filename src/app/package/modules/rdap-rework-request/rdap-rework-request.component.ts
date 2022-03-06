import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import * as appstringdata from 'src/assets/config/app-string';
import {
  CsvFileTypes,
  IColumnExportingEventArgs,
  IGridToolbarExportEventArgs,
  IgxCsvExporterOptions,
  IgxExcelExporterOptions,
  IgxExporterOptionsBase
} from '@infragistics/igniteui-angular';
import { IgxGridCellComponent } from '@infragistics/igniteui-angular/lib/grids/cell.component';
import { IgxGridRowComponent } from '@infragistics/igniteui-angular/lib/grids/grid/grid-row.component';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
declare function load(): any;

@Component({
  selector: 'app-rdap-rework-request',
  templateUrl: './rdap-rework-request.component.html',
  styleUrls: ['./rdap-rework-request.component.scss']
})
export class RdapReworkRequestComponent implements  OnInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('rejectalert', { static: true }) public rejectnotificationAlert: IgxDialogComponent;
  @ViewChild('accessalert', { static: true }) public accessnotificationAlert: IgxDialogComponent;
  public id: any;
  public attach_formData: FormData = new FormData();
  workflowflag: any;
  message: any;
  rmessage: any;
  amessage:any;
  err:boolean = false;
  isShow:boolean = false;
  accessApi: any;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
permissionData: any;

isReworkAdmin: boolean; 
  reqParam = {
    rwkId:0,
    reason: '',
    requeststatus: "Req",
    justification: '',
    jiraLink: '',
    myFile:[],
    description: null,
    impactincluded: true,
    impactanalysed: true,
    analysisReason: '',
    reworkList: [
      {
        parentplanitem: 0,
        devtype2Id: 0,
        isinstalled: true
        
      }
    ],
   
  }
  
  



  reqParamattach = {
    rwkId:0,
    
    MyFile:null,
    Description: null,
    
   
  }


  all_attachment = {

    reqParamfiles:[{
      rwkId:0,
    
      MyFile:null,
      Description: null,

    }]
  }


  route: string;
  routeName: string;
  baseApi: any;
  reworkId: string;
  
  viewExtrapinRequestData: any;
  tempjoin: any;
  actionFlag: any;
  public reworkDetailsArrObj: any[];
  public reworkDetailsFinal: any[];
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private router: Router,
    private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
    private location: Location, private snackbarInfoService: SnackbarInfoService,
    private actroute: ActivatedRoute) {
    this.baseApi = environment.reworkreqestapi;
    
this.accessApi = environment.userapiurl;
  
    if (this.location.path() != '') {
      this.route = this.location.path();
      this.routeName = this.route.split('/')[this.route.split('/').length - 1];
      
        if (this.route.includes('view')) {
          this.reworkId = this.route.split('/').pop();
        
            this.actionFlag = "V";
            if (this.reworkId ){
              
              this.getReworkRequestById();
            }
            
          } else {
            
              this.actionFlag = "A";
            
            
          }
        
      
    }
  }
  ngOnInit(): void {
    this.rolebasedPermission();
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

if(this.actionFlag == "A")
{
  if(!this.reworkId && this.isAdd)
  {
  this.isShow = true;
  }
  else{
    this.noAccessPermission();
  }
}

if(this.reworkId && this.isView && this.actionFlag == "V")
{
this.isShow = true;
}
else if(this.reworkId && (this.isEdit || this.isView) && this.actionFlag == "U")
{
this.isShow = true;
}
else{
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
this.isShow = true;

}


});
  }


  noAccessPermission()
  {
    this.accessnotificationAlert.open();
    this.amessage= "You are not authorized for this module";
    
  }


  cancel() {
    let finalUrl;
    if (this.route.includes('view')) {
      this.tempjoin = this.route.split('/');
      this.tempjoin.splice(- 1, 1);
      finalUrl = this.tempjoin.join('/');
      finalUrl = "/" + finalUrl;
      finalUrl = finalUrl.replace('view', 'list');
      this.router.navigate([finalUrl]);
    } else {
      let tempUrl;
      let selMasterData;
      tempUrl = this.route.replace('add', 'list');
      this.router.navigate([tempUrl.toString()]);
    }
  }
  reworkReqSubmit() {
   
    this.spinner.show();
    let rwId = 0;
    rwId = Number(this.reworkId);
    
    if(( this.reqParam.jiraLink ==  null || ( typeof this.reqParam.jiraLink!='undefined' && this.reqParam.jiraLink.trim().length == 0))  || 
    (this.reqParam.justification ==  null || (typeof this.reqParam.justification !='undefined' && this.reqParam.justification.trim().length == 0))  || 
    (this.reqParam.reason ==  null || (typeof this.reqParam.reason!='undefined' && this.reqParam.reason.trim().length == 0)) 
    
      )
    {

      
        this.message= "Please fill required fields!";
      
      this.spinner.hide();
      this.notificationAlert.open();
      this.err = true;
      
    }
else if(this.reqParam.reworkList.length == 0 && rwId == 0)
{
  
  
    this.message= "Please select minimum 1 Parent pin!";
  
 
  this.spinner.hide();
  this.notificationAlert.open();
  this.err = true;
}


    else 
if(this.reqParam.analysisReason ==  null || (typeof this.reqParam.analysisReason!='undefined' && this.reqParam.analysisReason.trim().length == 0) &&
  this.reqParam.impactanalysed == false)
{
  this.spinner.hide();
  this.notificationAlert.open();
  this.err = true;
        this.message= "Please provide Analysis reason";
}
else if(this.reqParam.reworkList.length >0)
{
  
for(let i = 0; i < this.reqParam.reworkList.length;i++)
{
if(this.reqParam.reworkList[i].devtype2Id == 0 || this.reqParam.reworkList[i].devtype2Id == null)
{
  this.message= "Please select rework dev class!";

this.spinner.hide();
this.notificationAlert.open();
this.err = true;
}
}
if(!this.err)
{



  if(rwId > 0)
  {
    
   
    this.reqParam.rwkId = rwId;
    this.masterApiService.masterUpdate(this.baseApi + "Rework?rwkId="+rwId, this.reqParam).subscribe(data => {
      
      if (data.isSuccess) {
        
        if(this.reqParamattach.MyFile != 'undefined' && this.reqParamattach.MyFile != null && this.reqParamattach.MyFile.length > 0)
        {
         
          for (let i = 0; i < this.reqParamattach.MyFile.length; i++) 
          {
          
            const formData: FormData = new FormData();
            let a = this.reqParamattach.MyFile[i].myFile;
            let b = this.reqParamattach.MyFile[i].description;
    formData.append('MyFile', this.allfiles[i]);
    
    formData.append('description', this.reqParamattach.MyFile[i].description);
    
            {
              this.masterApiService.masterAddFile(this.baseApi + "ReworkAttachment?rwkId="+ rwId, formData).subscribe(a_data => {
                          
                if (a_data.isSuccess) {
                  
                }
               
              });
          }

}
          
        }
        this.notificationAlert.open();
        this.message= "Data saved successfully";//data.message;
      }
      this.spinner.hide();
    });
  }
  else{
    this.masterApiService.masterAdd(this.baseApi + "Rework", this.reqParam).subscribe(data => {
      if (data.isSuccess) {
        
        if(this.reqParamattach.MyFile != 'undefined' && this.reqParamattach.MyFile != null && this.reqParamattach.MyFile.length > 0)
        {
          for (let i = 0; i < this.reqParamattach.MyFile.length; i++) 
          {
           
            const formData: FormData = new FormData();
           
    formData.append('MyFile', this.allfiles[i]);
    
    formData.append('description', this.reqParamattach.MyFile[i].description);
    
            {
              this.masterApiService.masterAddFile(this.baseApi + "ReworkAttachment?rwkId="+ data.data.rwkId, formData).subscribe(a_data => {
                          
                if (a_data.isSuccess) {
                  
                }
                // this.notificationAlert.open();
                // this.message= data.message;
                
              });
          }

}
          
        }
        
        this.notificationAlert.open();
        this.message= "Data saved successfully";//data.message;
      }
      this.spinner.hide();
    });

    
  }
}


}


      
    
   
    
  }

checkRejected()
{
  
  if(this.reworkId)
  {
    if(this.actionFlag == "U")
    {
      this.rejectnotificationAlert.open();
      this.rmessage = "Do you want to re-initiate Rework Approval Process?";
    }
  }
  else{
    this.reworkReqSubmit();
  }
    
}


  getReworkRequestById() {
    this.spinner.show();
    this.masterApiService.getRequestPinById(this.baseApi + "Rework/" + this.reworkId).subscribe(data => {
      
      this.viewExtrapinRequestData = data;
      
    if(this.viewExtrapinRequestData.data.requeststatus == "REJD")
    {
      this.actionFlag = "U";
      
    }
  
      
      this.spinner.hide();
    });
  }
  viewrecord() {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('add', 'list');
    this.router.navigate([tempUrl.toString()]);
  }
  reworkdetailsEvent(data) {
    
    
    this.reqParam.reworkList = [];
    this.err = false;
    if(data.value.parentplanitem1 > 0 )
    {
    
      this.reqParam.reworkList.push({ parentplanitem:  data.value.parentplanitem1,
        devtype2Id: data.value.devtype2Id,
    isinstalled: data.value.isinstalled
      
    });
       
    }
    
    if(data.value.parentplanitem2 > 0)
    {
      
      this.reqParam.reworkList.push({ parentplanitem: data.value.parentplanitem2,
        devtype2Id: data.value.devtype2Id2,
    isinstalled: data.value.isinstalled2
      });
    
    }

    if(data.value.parentplanitem3 > 0)
    {
      
      this.reqParam.reworkList.push({ parentplanitem: data.value.parentplanitem3,
        devtype2Id: data.value.devtype2Id3,
    isinstalled: data.value.isinstalled3
    
      });
      
    }
    
    if(this.reworkId &&( this.reqParam.reworkList == null || this.reqParam.reworkList.length == 0))
    {
let allData = this.viewExtrapinRequestData;
this.reqParam.reworkList = this.viewExtrapinRequestData.data.reworkList;
    }

    
    this.reqParam.jiraLink = data.value.jiraLink;
    
    this.reqParam.justification = data.value.justification;
    this.reqParam.reason = data.value.reason;
    this.reqParam.requeststatus = "Req";
   this.reqParam.analysisReason = data.value.analysisReason;
   this.reqParam.impactanalysed = data.value.impactanalysed;
     this.reqParam.impactincluded = data.value.impactincluded;
    
  }


  reworkattachmentEvent(formData) {
    

this.all_attachment = formData;


    this.reqParamattach.MyFile = formData;
   
  }
public allfiles : any;
  reworkAllFileList(formData) {
    

this.allfiles = formData;

   
  }


  onDialogSubmit(event){
    event.dialog.close(); 
    
    if(!this.err)
    {
      if(this.actionFlag == "U")
      {
this.message = this.cancel();
      }
      else{
        this.message = this.viewrecord();
      }
      
    }
    
  }

  onDialogSubmitY(event){
   
    this.reqParam.requeststatus = "Req";
    event.dialog.close(); 
    this.reworkReqSubmit();
    
    
  }
  onDialogSubmitN(event){
    this.reqParam.requeststatus = "REJD";
    event.dialog.close(); 
    this.reworkReqSubmit();
    
    
  }
  onDialogSubmitA(event){
    event.dialog.close(); 
    let url = "/home/dashboard";
    this.router.navigate([url]);
  }

}

