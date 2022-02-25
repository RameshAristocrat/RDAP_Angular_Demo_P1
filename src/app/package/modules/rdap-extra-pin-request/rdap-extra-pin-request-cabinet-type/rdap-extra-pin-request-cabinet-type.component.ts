import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rdap-extra-pin-request-cabinet-type',
  templateUrl: './rdap-extra-pin-request-cabinet-type.component.html',
  styleUrls: ['./rdap-extra-pin-request-cabinet-type.component.scss']
})
export class RdapExtraPinRequestCabinetTypeComponent implements OnInit,OnChanges {
  @ViewChild('cabinetgrid', { static: false }) public cabinetgrid: IgxGridComponent;
  @ViewChild("grid", { static: true }) public grid: IgxGridComponent;
  public data: any[];
  public datatemp: any;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  viewExtrapinRequestData:any;
  extraPinAPi:any;
  //commongridmodel:any[];
  public commongridmodel: any;
  public rowitem: any;
  public griddata: any;
  public mode: any;
  baseApi: string = "";
  public requesttitlearrobj: any[];
  public cabinetDdldata: any[];
  public cabinettypeform: FormGroup;
  @Input() exportfilename: string;
  @Input() pinId: string;
  @Output() cabinetEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService,
    private masterApiService: RdMasterApiService,public fb: FormBuilder) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
  }

  public ngAfterViewInit() {
    //this.cabinetgrid.selectRows([1,2]);
    // if (this.pinId) {
    //   this.getRequestPinById();
    // }
  }
  ngOnChanges(data) {
    if (this.pinId) {
      this.getRequestPinById();
    }
  }

  public buildForm() {
    this.cabinettypeform = this.fb.group({
      id: [''],
    });
    this.cabinettypeform.get('id').disable({ onlySelf: true });
  }

  ngOnInit() {
    this.requesttitlearrobj = [];
    this.cabinetDdldata = [];
    this.data=[];
    this.masterApiService.masterSearchDDL(this.baseApi + "cabinet/ddl").subscribe(data => {
      this.requesttitlearrobj.push(data);
      this.cabinetDdldata = this.requesttitlearrobj[0];
      this.data=this.cabinetDdldata;
    //       if (this.pinId) {
    //   this.getRequestPinById();
    // }
    });
    this.buildForm();
  }
  getRequestPinById() {
    //this.spinner.show();
    if(this.pinId != undefined && this.pinId != 'add')
    {

    
    this.masterApiService.getRequestPinById(this.extraPinAPi + "ExtraPin/" + this.pinId).subscribe(data => {
      this.viewExtrapinRequestData = data;
      this.viewExtrapinRequestForm();
      //this.spinner.hide();
    });
  }
  }
  rendered(){
    //this.cabinetgrid.selectRows([1,2]);
    if (this.pinId) {
      this.getRequestPinById();
    }
  }
  public viewExtrapinRequestForm() {
    this.cabinetgrid.selectRows(this.viewExtrapinRequestData.data.cabinetIds);
    this.cabinettypeform.controls["id"].setValue(this.pinId);
    this.cabinettypeform.get('id').disable({ onlySelf: true });
    //this.cabinetgrid.read
  //    this.extrapindetailsform.controls["regionId"].setValue(this.viewExtrapinRequestData.data.regionId);
  }
  public configureExport(args: IGridToolbarExportEventArgs) {
    // You can customize the exporting from this event
    const options: IgxExporterOptionsBase = args.options;
    options.fileName = this.exportfilename;

    if (options instanceof IgxExcelExporterOptions) {
      const excelOptions = options as IgxExcelExporterOptions;
      excelOptions.columnWidth = 10;
    } else {
      const csvOptions = options as IgxCsvExporterOptions;
      csvOptions.fileType = CsvFileTypes.CSV;
      csvOptions.valueDelimiter = '\t';
    }

    args.exporter.columnExporting.subscribe((columnArgs: IColumnExportingEventArgs) => {
      // Don't export image fields
      // columnArgs.cancel = columnArgs.header === 'Athlete' ||
      //                     columnArgs.header === 'Country';
    });
  }
  public handleRowSelection(args) {
    this.cabinetEvent.emit(args.newSelection);
  //  this.onSelGridRowData.emit(args);
    //this.behaviourService.setViewSelectedMasterDetails(args);
    if (args.added.length && args.added[0] === 3) {
      args.cancel = true;
    }
  }
  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // logSelection() {
  //   this.selection.selected.forEach(s => );
  // }

}
