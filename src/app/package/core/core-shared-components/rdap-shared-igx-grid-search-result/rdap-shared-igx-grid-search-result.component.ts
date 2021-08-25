import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IgxExcelExporterService, IgxGridComponent } from 'igniteui-angular';
import { DATA } from '../../../../../assets/config/customers';
import {
  CsvFileTypes,
  IColumnExportingEventArgs,
  IGridToolbarExportEventArgs,
  IgxCsvExporterOptions,
  IgxExcelExporterOptions,
  IgxExporterOptionsBase
} from 'igniteui-angular';
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
  public columndata:any;
  public loopGridContent;
  //@Input() panelOpenState: any;
  @Input() searchGridData: any;
  @Input() appString:any;
  @Input() exportfilename:string;
  constructor(private httpClient: HttpClient,private cdr: ChangeDetectorRef,private excelExportService: IgxExcelExporterService) { 
    this.appString=[];
    this.httpClient.get("assets/config/app-string.json").subscribe(y => {
      this.appString = y;
    })
  }

  ngOnInit(): void {
   // this.gridDataLoad();   
  }
  ngOnChanges() {
    if(this.searchGridData.length>0){
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
    const options: IgxExporterOptionsBase = args.options ;
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
public gridDataLoad(){
  this.columndata=[];
  this.loopGridContent=[];
    this.data = this.searchGridData;
    Object.keys(this.searchGridData[0]).forEach(x =>{
      this.appString.filter(g =>{
        if(x==g.modelname){
          this.columndata.push({ field:x, title:g.title, width: "150px", height:"10px", type: "string", pinned: true, hidden:g.gridcolflag});
        }
      });
     this.loopGridContent.push({"title":x,"data":("element."+x)});
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
}
