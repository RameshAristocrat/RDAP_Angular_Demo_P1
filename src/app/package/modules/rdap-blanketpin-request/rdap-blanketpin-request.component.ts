import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IgxColumnComponent, IgxDialogComponent, IgxExcelExporterService, IgxGridComponent, RowType } from '@infragistics/igniteui-angular';
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
export class RdapBlanketPinRequestComponent implements OnInit {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('finalalert', { static: true }) public finalalertnotificationAlert: IgxDialogComponent;
  @ViewChild("myGrid", { static: true })
  public grid: IgxGridComponent;
  public fileToUpload: any[] = [];
  public showGrid: boolean = false;
  public showSubmitButton: boolean = false;
  public submitSuccess: boolean = false;
  public rowStyles = {
    background: (row: RowType) => (row.data['message'] == "Success") ? '#000088' : '#000000'
  };

  managepinApi: any;
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

  onDialogSubmit(event) {
    event.dialog.close();
    this.grid.markForCheck();
  }

  onDialogSubmitfinalY(event) {
    event.dialog.close();
    this.verfiedblanketpinReqSubmit();
  }

  onDialogSubmitfinalN(event) {
    event.dialog.close();
  }


  addfile(event) {
    this.fileToUpload[0] = event.target.files[0];
    this.Processfile()
  }

  fileUploadclick(event) {
    this.showSubmitButton = false;
    this.showGrid = false;
    this.submitSuccess = false;
    event.target.value = null;
  }

  Processfile() {
    this.spinner.show();
    this.showGrid = false;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload[0]);
    this.legendData = [];
    this.masterApiService.masterAddFile(this.managepinApi + "BlanketPin/upload", formData).subscribe(a_data => {
      this.legendData = a_data.data;
      if (a_data.data == null) {
        this.notificationAlert.open();
        this.message = "Invalid column in file! Please download template file for column reference.";
        this.spinner.hide();
      }
      else if (a_data.isSuccess && a_data.data != null) {
        this.showSubmitButton = true;
        this.showGrid = true;
        this.spinner.hide();
        this.grid.markForCheck();
      }
      else if (!a_data.isSuccess && a_data.data != null) {
        this.showSubmitButton = false;
        this.showGrid = true;
        this.spinner.hide();
        this.grid.markForCheck();
      }
    });
  }

  blanketpinReqSubmit() {
    this.finalalertnotificationAlert.open();
  }

  verfiedblanketpinReqSubmit() {
    this.spinner.show();
    this.masterApiService.masterAdd(this.managepinApi + "BlanketPin", this.legendData).subscribe(data => {
      if (data.isSuccess) {
        this.submitSuccess = true;
        this.showSubmitButton = false;
        this.notificationAlert.open();
        this.message = "Data has been saved successfully";//data.message;
        this.legendData = data.data;
        this.spinner.hide();
      }
      else {
        this.submitSuccess = false;
        this.showSubmitButton = true;
        this.notificationAlert.open();
        this.message = "Something went wrong!";//data.message;
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

  downloadMyFile() {
    let urlVal = this.managepinApi + "BlanketPin/downloadtemplate";
    window.open(urlVal, "_blank");
  }
}

