import 'rxjs/Rx' ;
import { HttpEventType, HttpClient,HttpHeaders } from '@angular/common/http';
import { file } from 'jszip';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, Pipe, PipeTransform} from '@angular/core';
import { IgxExcelExporterService,IgxColumnComponent, IgxGridComponent, IGridEditDoneEventArgs } from '@infragistics/igniteui-angular';
import * as appstringdata from 'src/assets/config/app-string';
import { CsvFileTypes, IColumnExportingEventArgs, IGridToolbarExportEventArgs, IgxCsvExporterOptions, IgxExcelExporterOptions, IgxExporterOptionsBase, IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
import { SnackbarInfoService } from 'src/app/package/infoservice/snackbarservice/snackbar.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { IgxGridCommonModule } from "igniteui-angular";
import { IgxDialogComponent } from '@infragistics/igniteui-angular';
  import { IgxGridRowComponent } from 'igniteui-angular/lib/grids/grid/grid-row.component';
  import { IgxGridCellComponent } from 'igniteui-angular/lib/grids/cell.component';
import { url } from 'inspector';
  

@Component({
    selector: 'app-rdap-rework-attachment',
    templateUrl: './rdap-rework-attachment.component.html',
    styleUrls: ['./rdap-rework-attachment.component.scss'],
})
export class RdapReworkAttachmentComponent implements OnInit, OnChanges {
    
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('gametitelgrid', { static: false }) public gametitelgrid: IgxGridComponent;
    title = 'app';
    files: any = [];
    public showDownloadbtn : boolean = true;
    public filesdata: any = [];
    allfiles: any = [];
    message:any;
    public col: IgxColumnComponent;
    public pWidth: string;
    public nWidth: string;
    public reworkAttachmentform: FormGroup;
    public selectionMode = 'none';
    fileForm = new FormGroup({
        altText: new FormControl(''),
        description: new FormControl('')
      });

    @ViewChild('select') select: NgSelectComponent;

    public myGrid: IgxGridComponent;
    
    @Input() reworkId: any;
    
  @Input() isView: boolean;
  @Input()  isAdd: boolean;
  @Input()  isEdit: boolean;
  @Input() isDelete: boolean;
    
  @Output() reworkattachmentEvent = new EventEmitter<any>();
  @Output() reworkAllFileList= new EventEmitter<any>();
    @ViewChild("myGrid", { static: true }) 
    public grid: IgxGridComponent;
    selectedRows: number[] = [];
    display: FormControl = new FormControl("", Validators.required);
    description: FormControl = new FormControl("", Validators.required);
    reworkApi: any;
    viewExtrapinRequestData: any;
      reqstatus:any;
      count:number = 0;
    constructor(
    private https: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private spinner: RdSpinnerService,
    private snackbarInfoService: SnackbarInfoService) { 

        this.reworkApi = environment.reworkreqestapi;
        if (this.reworkId != null) {
        }

    }

    ngOnInit(): void {
        this.spinner.show();
        this.buildForm();
        
        if (this.reworkId) {
          this.reqstatus=0;
          this.selectionMode = 'multiple';
          if(this.viewExtrapinRequestData.data.requeststatus == "REJD")
        {
            
this.reqstatus = 1;
        }
        else
        {
            this.reqstatus = 0;
        }
        }
        else{
            this.reqstatus=1;
        }
        this.spinner.hide();
       
      }

      ngOnChanges(data) {
          
        this.buildForm();
    if (this.reworkId) {
      this.getReworkAttachmentDetailsByReworkId();
    
}
      }

      
      getReworkRequestById() {
        this.spinner.show();
        this.masterApiService.getRequestPinById(this.reworkApi + "Rework/" + this.reworkId).subscribe(data => {
          
          this.viewExtrapinRequestData = data;
         
          
          this.spinner.hide();
        });
        if(this.viewExtrapinRequestData.data.requeststatus == "REJD")
        {
            
this.reqstatus = 1;
        }
        else
        {
            this.reqstatus = 0;
        }
      }


      descriprionReq()
  {
    this.notificationAlert.open();
    this.message= "Please fill description!";
    
  }
  public handleRowSelection(event) {
    
    const targetCell = event.cell;
}

  onDialogSubmit(event){
    this.reworkAttachmentform.controls["myFile"].reset();
    event.dialog.close(); 
  }
  
  public buildForm() {
    this.reworkAttachmentform = this.fb.group({
        description:'',
        myFile:[null, Validators.required],
       
    
    });
      }


      onFileChange(event) {

        
        let reader = new FileReader();
       
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
        
          reader.onload = () => {
            this.reworkAttachmentform.patchValue({
                myFile : reader.result
            });
            
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
          this.reworkattachmentEvent.emit(this.reworkAttachmentform);
        }
      }

    public  fileToUpload: any[] = [];
    
    fileuploads(event, description:string) {
        if(this.reworkAttachmentform.controls['description'].value == null || 
        this.reworkAttachmentform.controls['description'].value == 'undefined'|| 
        (this.reworkAttachmentform.controls['description'].value).length == 0 )
        {
this.descriprionReq();
        }
        else{
          this.fileToUpload.push(event.target.files[0]);
          const files = event.target.files;
       
          if (files) {
              this.spinner.show();
              const f = files[0];
        const count = files.length > 1 ? `(+${files.length - 1} files)` : "";
        this.display.patchValue(`${files[0].name}${count}`);
        this.description.patchValue(`${files[0].name}${count}`);
              for (let i = 0; i < files.length; i++) {
                  const file = {
                      description: '',
                      fileName: '',
                      filetype: '',
                      fileSize: '',
                      //url: '',
                      attachmentId: this.filesdata.length +1
                  };
  
                  
                  file.fileName = files[i].name;
                  file.filetype = files[i].type;
                  file.description = this.reworkAttachmentform.controls['description'].value;
                  
                  const size = files[i].size / 1000;
                  const mbc = size + '';
                  const mb = mbc.split('.')[0];
                  const length = mb.length;
  
                  if (length === 4 || length === 5) {
                      const mbsize = size / 1000;
                      const splitdata = mbsize + '';
                      const splitvalues = splitdata.split('.');
                      let secondvariable = '';
                      for (let j = 0; j < splitvalues.length; j++) {
                          if (j === 1) {
                              secondvariable = splitvalues[j].slice(0, 2);
                          }
                      }
  
                      file.fileSize = splitvalues[0] + '.' + secondvariable + 'MB';
                  }
                  else {
                      const splitdata = size + '';
                      const splitvalues = splitdata.split('.');
                      let secondvariable = '';
                      for (let j = 0; j < splitvalues.length; j++) {
                          if (j === 1) {
                              secondvariable = splitvalues[j].slice(0, 2);
                          }
                      }
  
                      file.fileSize = splitvalues[0] + '.' + secondvariable + 'KB';
                  }
  
                  const reader = new FileReader();
                  reader.onload = (filedata) => {
                    //  file.url = reader.result + '';
                     
                  };
  
                  reader.readAsDataURL(files[i]);
                  
                 
                  this.filesdata.push(file);
  this.grid.markForCheck();
  this.buildForm();
                 
  
                  
              }
             
          }
          else{
              this.display.patchValue("");
              this.description.patchValue("");
          }
          this.reworkAllFileList.emit(this.fileToUpload);
          this.reworkattachmentEvent.emit(this.filesdata);
         this.spinner.hide();   
        }
       
    }

    deleteFile(file: any) {

        const index = this.files.indexOf(file);
        this.files.splice(index, 1);
        this.allfiles.splice(index, 1);
    }

    save() {
        
    }

    public onResize(event) {
        this.col = event.column;
        this.pWidth = event.prevWidth;
        this.nWidth = event.newWidth;
    }
    editDone(data){

       
      }

    finalizeTour(cell: IgxGridCellComponent) { 
        
        let clickedRow = cell.cellID.rowID;
      }

    
   



    handleFileInput(e: any) {
      this.fileToUpload = e?.target?.files[0];

      const formData: FormData = new FormData();
      this.reworkAttachmentform.controls["description"].setValue("");
      formData.append('description', "Test");
      this.reworkattachmentEvent.emit(formData);


    }


    getReworkAttachmentDetailsByReworkId() {
        this.spinner.show();
        this.masterApiService.getRequestPinById(this.reworkApi + "ReworkAttachment/getbyrework/" + this.reworkId).subscribe(data => {
          
         
            this.filesdata= data.data;
        if(this.filesdata.length == 0 || this.filesdata == undefined)
        {
          this.showDownloadbtn = false;
        }
        else{
          this.showDownloadbtn = true;
        }
          
        });

        this.masterApiService.getRequestPinById(this.reworkApi + "Rework/" + this.reworkId).subscribe(data => {
          
            this.viewExtrapinRequestData = data;
           
           this.checkStatus();
          });

         
         

        this.spinner.hide();
      }

      checkStatus()
      {
        if(this.viewExtrapinRequestData.data.requeststatus == "REJD")
        {
            
this.reqstatus = 1;
        }
        else
        {
            this.reqstatus = 0;
        }
        

      }

// uploadAll()
// {
//     this.spinner.show();
    
//     this.reworkAllFileList.emit(this.fileToUpload);
//     this.reworkattachmentEvent.emit(this.filesdata);
//     this.spinner.hide();

// }


deleteRowsold() {
    let selectedRows = this.grid.selectedRows;
    selectedRows.forEach(e => {
      this.grid.deleteRowById(e);
    });
  }

  deleteRows(e,val) {
    this.spinner.show();
    //this.filesdata = this.filesdata.splice(item => item.attachmentId !== val);
    const index: number =  this.filesdata.findIndex(x => x.attachmentId == val); //(val - 1);
    if (index !== -1) {
       this.filesdata.splice(index, 1);
    }  
    this.grid.markForCheck();
    this.spinner.hide();
  }


  deleteRowsbtn(selected) {
      
     let selectedRow = this.grid.getRowByIndex(selected).data;
     this.grid.deleteRow(selected);
     this.grid.markForCheck();
    selectedRow.forEach(e => {
      this.grid.deleteRowById(e);
    });
  }


  downloadAllfiles()
  {



    let selectedRows = this.grid.selectedRows;
    
    
    
    this.masterApiService.getFilebyfileId(this.reworkApi + "ReworkAttachment/DownloadFile/" + 
    selectedRows[0]).subscribe(data => 
        { 
            
          this.https.get(this.reworkApi + "ReworkAttachment/DownloadFile/" + 
          selectedRows[0],{responseType:'blob'}).subscribe((img)=>{
            const link = document.createElement('a');
            link.style.display = 'none';
            link.download = "sample image";
             link.href =window.URL.createObjectURL(data);
            link.click();
      });

    
    
    
    
    
    
    
    
    
   });
      
  }

  deleteAllfiles()
  {
    let selectedRows = this.grid.selectedRows;
    
    

    this.spinner.show();
    for (let i = 0; i < this.selectedRows.length; i++){
        this.masterApiService
        .deleteMasterDataById(this.reworkApi + "ReworkAttachment/" + selectedRows[i])
        .subscribe((data) => {
          if (data.isSuccess) {
            this.snackbarInfoService.openSucessSnackBar(data.message);
          }
          //this.cancel();
        });
    }
   
    this.spinner.hide();
        
    this.grid.markForCheck();
  }

  downloadselectedfiles()
  {
    let selectedRows = this.grid.selectedRows;
    
    

    this.spinner.show();
    let urlVal = this.reworkApi + "ReworkAttachment/DownloadFiles/" + selectedRows;
    
    window.open(urlVal, "_blank");
   
    this.spinner.hide();
        
    this.grid.markForCheck();
  }

  goToLink(attachmentId)
  {
    let urlVal = this.reworkApi + "ReworkAttachment/DownloadFile/" + attachmentId;
  
    window.open(urlVal, "_blank");
  }
  





  removeRow(event: any, id: any) {
    let selectedRow = [];
    selectedRow.push(id.rowIndex);
    this.grid.clearCellSelection();
    this.grid.deleteRowById(id.rowID);
    this.grid.navigation.activeNode = null;
    this.grid.nativeElement.focus();
    event.stopPropagation();
  }

}




