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
import * as rolePermossionMockJs from '../../../../../assets/config/rolePermissionMockData';
import * as rolePermossionMpMaster from '../../../../../assets/config/rolePermissionMockForMaster';
import * as APIindex from '../../../api/apiEndpoints/apiIndex';
@Component({
  selector: 'app-rdap-manage-pin-cabinet-tab',
  templateUrl: './rdap-manage-pin-cabinet-tab.component.html',
  styleUrls: ['./rdap-manage-pin-cabinet-tab.component.scss']
})
export class RdapManagePinCabinetTabComponent implements OnInit, OnChanges {
  @ViewChild('cabinetgrid', { static: false }) public cabinetgrid: IgxGridComponent;
  @ViewChild("grid", { static: true }) public grid: IgxGridComponent;
  public data: any[];
  public datatemp: any;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  viewExtrapinRequestData: any;
  extraPinAPi: any;
  //commongridmodel:any[];
  public commongridmodel: any;
  public rowitem: any;
  public griddata: any;
  public mode: any;
  baseApi: string = "";
  public requesttitlearrobj: any[];
  public cabinetDdldata: any[];
  //public cabinetform: FormGroup;
  pinId: any;
  selcabinetid:any[];
  managepin: any;
  mpproductPermission: any;
  mpdependencyPermission: any;
  mpmilestonePermission: any;
  @Input() mpcabinetPermission: any;
  mptesterPermission: any;
  mpsetitemPermission: any;
  mplinkedPermission: any;
  mpimpactedPermission: any;
  mpauditPermission: any;
  mpclarityPermission: any;
  public pagePermission: any;
  public rolePermissionEnableFlag: any;
  public rolepermissionmock: boolean = false;
  gridrowselectionflag: string = "multiple"
  @Input() exportfilename: string;
  @Input() planitem: any;
  @Output() cabinetEvent = new EventEmitter<any>();
  emitData: { data: any, flag: boolean };
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService,
    private masterApiService: RdMasterApiService, public fb: FormBuilder) {
    this.baseApi = environment.baseapiurl;
    this.extraPinAPi = environment.extrapinreqapiurl;
    this.rolePermissionEnableFlag = environment.enablerolepermission;
    this.rolepermissionmock = environment.enablerolepermissionmock;
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
    // this.cabinettypeform = this.fb.group({
    //   id: [''],
    // });
    // this.cabinettypeform.get('id').disable({ onlySelf: true });
  }

  public getPermissionmpMasterByModule() {
    this.pagePermission = [];
    this.masterApiService.masterSearchDDL(this.baseApi + "cabinet/ddl").subscribe(data => {
      this.requesttitlearrobj.push(data);
      this.cabinetDdldata = this.requesttitlearrobj[0];
      this.data = this.cabinetDdldata;
      this.getRequestPinById();
    });
    this.buildForm();
    this.viewExtrapinRequestForm();
    this.pagePermission.push(this.mpcabinetPermission);
    if(this.mpcabinetPermission.isView == true && this.mpcabinetPermission.isEdit == false){
      this.isViewOnlyPermission();
    }
    if(this.mpcabinetPermission.isEdit == true){
      this.gridrowselectionflag = "multiple";
    }else{
      this.gridrowselectionflag = "none";
      this.cabinetgrid.rowSelection = "none";
    }
  }
  isViewOnlyPermission(){

  }
  ngOnInit(): void {
    this.getPermissionmpMasterByModule();
    this.requesttitlearrobj = [];
    this.cabinetDdldata = [];
    this.data = [];
    this.viewExtrapinRequestData = this.planitem;
    this.pinId = this.planitem.data.planitem;
  }
  getRequestPinById() {
    //this.spinner.show();
    this.selcabinetid = [];
    this.masterApiService.getRequestPinById(this.extraPinAPi + "ManagePinCabinet/getbyplanitem/" + this.pinId).subscribe(data => {
      data.forEach(y => {
        this.selcabinetid.push(y.cabinetId);
      });
      this.viewExtrapinRequestData = data;
      this.viewExtrapinRequestForm();
      //this.spinner.hide();
    });
  }
  rendered() {
    
    //this.cabinetgrid.selectRows([1,2]);
    if (this.pinId) {
      this.getRequestPinById();
    }
  }
  public viewExtrapinRequestForm() {
    if(this.cabinetgrid != undefined && this.cabinetgrid.selectRows != undefined)
    {
      this.cabinetgrid.selectRows(this.selcabinetid);

    }
        // this.cabinettypeform.controls["id"].setValue(this.pinId);
    // this.cabinettypeform.get('id').disable({ onlySelf: true });
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
    this.emitData = {data:null,flag:false};
    this.emitData = {data:args.newSelection,flag:true};
    this.cabinetEvent.emit(this.emitData);
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
