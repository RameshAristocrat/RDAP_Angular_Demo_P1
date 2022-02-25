// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// export interface PeriodicElement {
//   name: string;
//   position: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Game Title#1' },
//   { position: 2, name: 'Game Title#2'},
//   { position: 3, name: 'Game Title#3'},
//   { position: 4, name: 'Game Title#4'},
//   { position: 5, name: 'Game Title#5'},
//   { position: 6, name: 'Game Title#6'},
//   { position: 7, name: 'Game Title#7'},
//   { position: 8, name: 'Game Title#8'}
// ];


// @Component({
//   selector: 'app-rdap-extra-pin-request-game-title',
//   templateUrl: './rdap-extra-pin-request-game-title.component.html',
//   styleUrls: ['./rdap-extra-pin-request-game-title.component.scss']
// })
// export class RdapExtraPinRequestGameTitleComponent implements OnInit {
//   displayedColumns: string[] = ['position', 'name', 'actions'];
//   dataSource = new MatTableDataSource(ELEMENT_DATA);

//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//   }
//   constructor() { }

//   ngOnInit(): void {
//   }

// }
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
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';

@Component({
  selector: 'app-rdap-extra-pin-request-game-title',
  templateUrl: './rdap-extra-pin-request-game-title.component.html',
  styleUrls: ['./rdap-extra-pin-request-game-title.component.scss']
})
export class RdapExtraPinRequestGameTitleComponent implements OnInit,OnChanges {
  @ViewChild('gametitelgrid', { static: false }) public gametitelgrid: IgxGridComponent;
  public data: any[];
  public datatemp: any;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  //commongridmodel:any[];
  public commongridmodel: any;
  public rowitem: any;
  public griddata: any;
  public mode: any;
  baseApi: string = "";
  public requesttitlearrobj: any[];
  public titleDdldata: any[];
  public gameTitleArrObj: any[];
  public gametitleform: FormGroup;
  public extrapinbaseApi:any;
  public viewExtrapinRequestData:any;
  public gametitleviewdata:any[];
  @Input() actionflag:any;
  @Input() pinId: string;
  @Output() gametitleEvent = new EventEmitter<any>();
  @Output() gametitleBusJustEvent = new EventEmitter<any>();
  // @Input() exportfilename: string;
  //@Output() commongridmodelrow = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService,
    private masterApiService: RdMasterApiService,public fb: FormBuilder,
    private spinner: RdSpinnerService) {
    this.commongridmodel = [];
    this.baseApi = environment.baseapiurl;
    this.extrapinbaseApi =environment.extrapinreqapiurl;
  }

  ngOnInit(): void {
    this.requesttitlearrobj = [];
    this.titleDdldata = [];
    this.masterApiService.masterSearchDDL(this.baseApi + "title/ddl").subscribe(data => {
      this.requesttitlearrobj.push(data);
      this.titleDdldata = this.requesttitlearrobj[0];
    });
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
    this.gametitleviewdata=[];
      this.gametitleform.controls["id"].setValue(this.pinId);
      this.gametitleform.get('id').disable({ onlySelf: true });
      this.gametitleform.controls["businessJustification"].setValue(this.viewExtrapinRequestData.data.businessJustification);
      this.gametitleform.get('businessJustification').disable({ onlySelf: true });
      this.gametitleviewdata.push({id:this.viewExtrapinRequestData.data.titleId,
        description:this.viewExtrapinRequestData.data.title,
        description2:this.viewExtrapinRequestData.data.title});
  }
  public busjustification(event){

    this.gametitleBusJustEvent.emit(this.gametitleform);
  }
  public buildForm() {
    this.gametitleform = this.fb.group({
      id: [''],
      businessJustification:['']
    });
    this.gametitleform.get('id').disable({ onlySelf: true });
  }
  onchangeSelect(event, cell, data, field) {
    this.gameTitleArrObj = [];
    let row: IgxGridRowComponent = cell.row;
    row.cells.forEach(function (cell: IgxGridCellComponent) {
      if (cell.column.field === "description2") {
        cell.update(event.description2);
      }
      else if (cell.column.field === "description") {
        cell.update(event.description);
      }
      else if (cell.column.field === "id") {
        cell.update(event.id);
      }

    });
  }
  editDone(data){

    this.gametitelgrid.data.forEach(x => {
      this.gameTitleArrObj.push({ title: x.description2, id: x.id })
    });
    // this.commongridmodel.filter(x=>{
    //   x[field].push(event.newSelection.value["id"]);{griddata:this.gameTitleArrObj, busjustify:this.gametitleform}
    // });
     this.gametitleEvent.emit(this.gameTitleArrObj);
  }

}
