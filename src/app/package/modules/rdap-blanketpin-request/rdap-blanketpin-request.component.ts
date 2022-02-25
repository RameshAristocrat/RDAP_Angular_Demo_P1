import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IgxColumnComponent, IgxDialogComponent, IgxExcelExporterService, IgxGridComponent,RowType } from '@infragistics/igniteui-angular';
// import * as appstringdata from 'src/assets/config/app-string';
// import * as XLSX from 'xlsx';
// import {
//   CsvFileTypes,
//   IColumnExportingEventArgs,
//   IGridToolbarExportEventArgs,
//   IgxCsvExporterOptions,
//   IgxExcelExporterOptions,
//   IgxExporterOptionsBase
// } from '@infragistics/igniteui-angular';
import { IgxGridCellComponent } from '@infragistics/igniteui-angular/lib/grids/cell.component';
import { IgxGridRowComponent } from '@infragistics/igniteui-angular/lib/grids/grid/grid-row.component';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from '../../infoservice/snackbarservice/snackbar.service';
import { env } from 'process';
declare function load(): any;

@Component({
  selector: 'app-rdap-blanketpin-request',
  templateUrl: './rdap-blanketpin-request.component.html',
  styleUrls: ['./rdap-blanketpin-request.component.scss']
})
export class RdapBlanketPinRequestComponent implements  OnInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('finalalert', { static: true }) public finalalertnotificationAlert: IgxDialogComponent;
  @ViewChild("myGrid", { static: true }) 
    public grid: IgxGridComponent;
  public  fileToUpload: any[] = [];
  public showGrid: boolean = false;
  public showSubmitButton: boolean = false;
  public submitSuccess: boolean = false;
  public  rowStyles = {
  
    background: (row: RowType) => (row.data['message'] == "Success" ) ? '#000088' : '#000000'
   };
 
  managepinApi:any;
  message: any;
  
public legendData: any[];

  baseApi: any;
  
  constructor(private masterApiService: RdMasterApiService, private spinner: RdSpinnerService,
   ) {
    this.baseApi = environment.reworkreqestapi;
    this.managepinApi = environment.extrapinreqapiurl;
    
  
  }
  ngOnInit(): void {
    
  }

  

  onDialogSubmit(event){
    event.dialog.close(); 
    
  }

  onDialogSubmitfinalY(event){
    event.dialog.close(); 
    //this.Processfile();
    this.verfiedblanketpinReqSubmit();
  }

  onDialogSubmitfinalN(event){
    event.dialog.close(); 
    
  }

 
  addfile(event)     
  {    
    // this.spinner.show();
    // this.showGrid=false;   
  //  this.fileToUpload.push(event.target.files[0]);
    this.fileToUpload[0]= event.target.files[0];
  // this.file= event.target.files[0];     
  // let fileReader = new FileReader();    
  // fileReader.readAsArrayBuffer(this.file);     
  // fileReader.onload = (e) => {    
  //     this.arrayBuffer = fileReader.result;    
  //     var data = new Uint8Array(this.arrayBuffer);    
  //     var arr = new Array();    
  //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
  //     var bstr = arr.join("");    
  //     var workbook = XLSX.read(bstr, {type:"binary"});    
  //     var first_sheet_name = workbook.SheetNames[0];    
  //     var worksheet = workbook.Sheets[first_sheet_name];    
  //       var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
  //       this.legendData = arraylist;    
  //       this.filelist = [];    
           
    
  // }    
  //this.finalalertnotificationAlert.open();
  this.Processfile();
  // const formData: FormData = new FormData();     
  // formData.append('file', event.target.files[0]);
  // this.legendData = [];
  //           this.masterApiService.masterAddFile(this.managepinApi + "BlanketPin/upload", formData).subscribe(a_data => {
  //             this.legendData = a_data.data;  
  //             if (a_data.isSuccess) {
  //               this.showSubmitButton = true;
  //             }
  //             else{
  //               this.showSubmitButton = false;
  //             }
  //             this.showGrid=true;   
  //             this.spinner.hide();
  //             this.grid.markForCheck();
  //           });
} 


Processfile()     
{    
  

    this.spinner.show();
    this.showGrid=false;   


    const formData: FormData = new FormData();
             
    formData.append('file', this.fileToUpload[0]);
    
    //formData.append('description', this.reqParamattach.MyFile[i].description);
          
    
    this.legendData = [];
    
    
              this.masterApiService.masterAddFile(this.managepinApi + "BlanketPin/upload", formData).subscribe(a_data => {
                this.legendData = a_data.data;  
               
                if(a_data.data == null)
                {
                  
                  this.notificationAlert.open();
                  this.message= "Invalid column in file! Please download template file for column reference.";
                  this.spinner.hide();
                }
                else if (a_data.isSuccess && a_data.data != null) {
                  this.showSubmitButton = true;
                  this.showGrid=true;   
                this.spinner.hide();
                this.grid.markForCheck();
                }
                else if (!a_data.isSuccess && a_data.data != null){
                  this.showSubmitButton = false;
                  this.showGrid=true;   
                this.spinner.hide();
                this.grid.markForCheck();
                }
                
    
                
        
                
                
              });
          
    
  
  
     


} 

blanketpinReqSubmit()
{
  this.finalalertnotificationAlert.open();
  // this.spinner.show();
  // this.masterApiService.masterAdd(this.managepinApi + "BlanketPin", this.legendData).subscribe(data => {
  //   if (data.isSuccess) {
      
  //     this.submitSuccess = true;
      
  //     this.showSubmitButton = false;
  //     this.notificationAlert.open();
  //     this.message= "Data has been saved successfully";//data.message;
  //     this.legendData = data.data;
  //     this.grid.markForCheck();
      
  //   }
  //   else{
  //     this.submitSuccess = false;
      
  //     this.showSubmitButton = true;
  //     this.notificationAlert.open();
  //     this.message= "Something went wrong!";//data.message;
  //     this.legendData = data.data;
  //     this.grid.markForCheck();
  //   }
    
  // });
  // this.spinner.hide();
}

verfiedblanketpinReqSubmit()
{
  this.spinner.show();
  this.masterApiService.masterAdd(this.managepinApi + "BlanketPin", this.legendData).subscribe(data => {
    if (data.isSuccess) {
      
      this.submitSuccess = true;
      
      this.showSubmitButton = false;
      this.notificationAlert.open();
      this.message= "Data has been saved successfully";//data.message;
      this.legendData = data.data;
      this.spinner.hide();
      
      
    }
    else{
      this.submitSuccess = false;
      
      this.showSubmitButton = true;
      this.notificationAlert.open();
      this.message= "Something went wrong!";//data.message;
      this.legendData = data.data;
      this.spinner.hide();
     
      
    }
    
  });
  
  this.grid.markForCheck();
}



public backgroundClasses = {
  
  highlighted: (rowData: any, columnKey: any) => {
    return rowData.message != "Success";
  },
};



public onColumnInit(col: IgxColumnComponent) {
  col.cellClasses = this.backgroundClasses;
}


downloadMyFile(){
  let urlVal = this.managepinApi + "BlanketPin/downloadtemplate";
    window.open(urlVal, "_blank");
}


}

