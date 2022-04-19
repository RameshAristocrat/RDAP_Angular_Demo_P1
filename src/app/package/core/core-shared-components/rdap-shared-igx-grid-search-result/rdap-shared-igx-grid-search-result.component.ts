import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { GridPagingMode, IgxColumnComponent, IgxDialogComponent, IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
import { DATA } from '../../../../../assets/config/customers';
import * as appstringdata from 'src/assets/config/app-string';
import {
  CsvFileTypes,
  IColumnExportingEventArgs,
  IGridToolbarExportEventArgs,
  IgxCsvExporterOptions,
  IgxExcelExporterOptions,
  IgxExporterOptionsBase
} from '@infragistics/igniteui-angular';
import { BehaviourSubjectService } from '../../services/behaviour-subject.service';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-rdap-shared-igx-grid-search-result',
  templateUrl: './rdap-shared-igx-grid-search-result.component.html',
  styleUrls: ['./rdap-shared-igx-grid-search-result.component.scss']
})
export class RdapSharedIgxGridSearchResultComponent implements OnInit,OnChanges {
  @ViewChild('alert', { static: true }) public notificationAlert: IgxDialogComponent;
  @ViewChild('grid1', { static: true }) public grid: IgxGridComponent;
  public mode = GridPagingMode.Remote;
  public data: any[];
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  public filterflag: any;
  public rowselectionflag:any
  public autogenFlag:any;
  exportdisplay: any;
  debuggerflag:boolean;
  public gridHeaderDisplay: Boolean= true;
  public columnName:string[];
  public message:any;
  public pinnedColName:any;
  @Input() searchGridData: any[];
  @Input() totalCount : any ;
  @Input() appString: any;
  @Input() exportfilename: string;
  @Input() pagename: string;
  @Output() onSelGridRowData = new EventEmitter<any>();
  @Output() onPageChangeEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,private masterApiService: RdMasterApiService,
    private excelExportService: IgxExcelExporterService, private behaviourService: BehaviourSubjectService) {
    this.debuggerflag = environment.debuggerflag;
  }

  ngOnInit(): void {
    this.appString = [];
    this.exportdisplay = "block";
    this.filterflag = false;
    this.autogenFlag = false;
    this.rowselectionflag = "single";
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
    }
    if (this.pagename == "managepin-linkedpin" || this.pagename == "managepin-impactedpin") {
      this.filterflag = false;
      this.exportdisplay = "none";
      this.rowselectionflag = "none";
      this.autogenFlag = false;
    }else if(this.pagename == "managepintab"){
      this.filterflag = false;
      this.exportdisplay = "none";
      this.rowselectionflag = "none";
      this.autogenFlag=true;
    }   
  }
  ngOnChanges() {
    if (this.searchGridData != undefined && this.searchGridData?.length > 0) {
      if(this.totalCount == undefined)
      {
        this.totalCount = this.searchGridData.length;
      }
      this.gridDataLoad();
    }
    else{
      this.filterflag = false;
      this.exportdisplay = "none";
      this.autogenFlag=true;
      if (this.searchGridData != undefined)
      {
         this.data = this.searchGridData;
      }
     
      this.columndata = [];
      this.loopGridContent = [];
    }
  }
  public exportButtonHandler() {
    this.excelExportService.export(this.grid, new IgxExcelExporterOptions("ExportedDataFile"));
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
    });
  }
  public gridDataLoad() {
    this.columndata = [];
    this.loopGridContent = [];
    this.columnName=[];
    if (this.pagename == "managepintab"
       || this.pagename == "managepin-linkedpin" || this.pagename == "managepin-impactedpin") {
      this.filterflag = false;
      this.exportdisplay = "none";
    } else {
      this.filterflag = true;
      this.exportdisplay = "block"
    }
    this.data = this.searchGridData.filter((x, i, a) => x && a.indexOf(x) === i);
    if(this.pagename == "extrapinreqlist"){
      Object.keys(this.searchGridData[0]).forEach(x=>{
        this.columnName.push(x);
       
      });
      this.columnName[1]="requeststatusDesc"
      this.columnName[34]="requeststatus";
    }else{
      Object.keys(this.searchGridData[0]).forEach(x=>{
        this.columnName.push(x);
       
      });
    };
    this.columnName.forEach(x => {
      this.appString.filter(g => {
        if (x == g.modelname) {
          if(this.pagename == "managepin-linkedpin"){
            if (x == "planitem") {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: true
              });
            }
            if (x == "linkedpinno") {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            } else {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            }
          }else if(this.pagename == "managepin-impactedpin"){
            if (x == "planitem") {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: true,
                resizable:true
              });
            }
            if (x == "impactedpinno") {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            } else {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            }
          }
          else if(this.pagename == "extrapinreqlist")
          {
            
            if(x == "createdby" || x == "createddate"|| x == "lastupdateddate" || x == "lastupdatedby" )
            {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: false,
                resizable: true, filter: this.filterflag
              });
            }
            else {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            }
          }
          else if (this.pagename == "auditlog") {
            this.columndata.push({
              field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
              resizable: true, filter: this.filterflag
            });
          }
          else{
            if (x == "planitem") {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            } else {
              this.columndata.push({
                field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: false, hidden: g.gridcolflag,
                resizable: true, filter: this.filterflag
              });
            }
          }
        }
      });
      this.loopGridContent.push({ "title": x, "data": ("element." + x) });
    });
  }
  public clearSearch() {
    this.searchText = '';
    this.grid.clearSearch();
  }

  public searchKeyDown(ev) {
    if (ev.key === 'Enter' || ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
    }
  }

  public updateSearch() {
    this.caseSensitive = !this.caseSensitive;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  public updateExactSearch() {
    this.exactMatch = !this.exactMatch;
    this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
  }

  public handleRowSelection(args) {
    this.onSelGridRowData.emit(args);
    this.behaviourService.setViewSelectedMasterDetails(args);
    if (args.added.length && args.added[0] === 3) {
      args.cancel = true;
    }
  }
  public onPageChange(pageNumber: number) {
    this.onPageChangeEvent.emit(pageNumber);
    
  }
  public update(event, cell) {
  }
  columnPinning(event) {
    this.pinnedColName = event.column.field;
    if(event.isPinned == false && event.insertAtIndex > 4){
      this.notificationAlert.open();
      this.message = "You can pin only up to 5 columns!!";
    }
  }
  onDialogSubmit(event) {
    event.dialog.close();
    this.grid.unpinColumn(this.pinnedColName);
  }
  public toggleColumn(col: IgxColumnComponent) {
    col.pinned ? col.unpin() : col.pin();
}
}
