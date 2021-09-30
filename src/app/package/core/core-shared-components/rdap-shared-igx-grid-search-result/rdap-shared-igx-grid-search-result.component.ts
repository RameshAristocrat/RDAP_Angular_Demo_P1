import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IgxExcelExporterService, IgxGridComponent } from '@infragistics/igniteui-angular';
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
@Component({
  selector: 'app-rdap-shared-igx-grid-search-result',
  templateUrl: './rdap-shared-igx-grid-search-result.component.html',
  styleUrls: ['./rdap-shared-igx-grid-search-result.component.scss']
})
export class RdapSharedIgxGridSearchResultComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('grid1', { static: true }) public grid: IgxGridComponent;
  public data: any[];
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  //@Input() panelOpenState: any;
  @Input() searchGridData: any;
  @Input() appString: any;
  @Input() exportfilename: string;
  @Output() onSelGridRowData = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService, private behaviourService: BehaviourSubjectService) {
    // this.appString=[];
    // this.httpClient.get("assets/config/app-string.json").subscribe(y => {
    //   this.appString = y;
    // })
  }

  ngOnInit(): void {
    this.appString = [];
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
      console.log("this.appString grid", this.appString)
    }
    // this.gridDataLoad();   
  }
  ngOnChanges() {
    if (this.searchGridData.length > 0) {
      this.gridDataLoad();
    }
    //this.getDoctypeSearchFormData(this.selbasedoctype);
  }
  public ngAfterViewInit() {
    //this.grid.selectColumns(['City', 'PostalCode']);
    //this.cdr.detectChanges();
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
      csvOptions.fileType = CsvFileTypes.TSV;
      csvOptions.valueDelimiter = '\t';
    }

    args.exporter.columnExporting.subscribe((columnArgs: IColumnExportingEventArgs) => {
      // Don't export image fields
      // columnArgs.cancel = columnArgs.header === 'Athlete' ||
      //                     columnArgs.header === 'Country';
    });
  }
  public gridDataLoad() {
    this.columndata = [];
    this.loopGridContent = [];
    this.data = this.searchGridData;
    Object.keys(this.searchGridData[0]).forEach(x => {
      this.appString.filter(g => {
        if (x == g.modelname) {
          this.columndata.push({ field: x, title: g.title, width: "150px", height: "10px", type: "string", pinned: true, hidden: g.gridcolflag });
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
    console.log("args", args);
    this.onSelGridRowData.emit(args);
    this.behaviourService.setViewSelectedMasterDetails(args);
    if (args.added.length && args.added[0] === 3) {
      args.cancel = true;
    }
  }

  public update(event, cell) {
    console.log(event);
    console.log(cell);
  }
}
