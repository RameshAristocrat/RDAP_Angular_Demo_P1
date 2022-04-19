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

@Component({
  selector: 'app-rdap-shared-config-dynamic-igx-grid',
  templateUrl: './rdap-shared-config-dynamic-igx-grid.component.html',
  styleUrls: ['./rdap-shared-config-dynamic-igx-grid.component.scss']
})
export class RdapSharedConfigDynamicIgxGridComponent implements OnInit {
  @ViewChild('grid1', { static: true }) public grid: IgxGridComponent;
  public data: any[];
  public datatemp:any;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  public columndata: any;
  public loopGridContent;
  @Input() commongridmodel: any;
  @Input() rowitem: any;
  @Input() griddata:any;
  @Input() mode:any;
  @Output() commongridmodelrow = new EventEmitter<any>();
  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef,
    private excelExportService: IgxExcelExporterService) { }

  ngOnInit(): void {
    if(this.mode == "U" || this.mode == "V"){
      this.data=[];
      if(this.rowitem.field=="channeltypeIds"){
        this.commongridmodelrow.emit(this.griddata.data.channeltypeIds);
        this.griddata.data.channeltypeIds.forEach(x => {
          let tempData = this.rowitem.ddldata.filter(y => {
            return y.id == x;
          })
          this.data.push(tempData[0]);
        });
  
      }else if(this.rowitem.field=="marketIds"){
        this.commongridmodelrow.emit(this.griddata.data.marketIds);
        this.griddata.data.marketIds.forEach(x => {
          let tempData = this.rowitem.ddldata.filter(y => {
            return y.id == x;
          })
          this.data.push(tempData[0]);
        });
      }
    }else{
      this.data=null;
    }
  }
  onchangeSelect(event, cell, data, field){
    let row: IgxGridRowComponent = cell.row;
    row.cells.forEach(function(cell: IgxGridCellComponent) {
      if (cell.column.field === "description2") {
        cell.update(event.newSelection.value.description2);
      }
      else if(cell.column.field === "description"){
        cell.update(event.newSelection.value.description);
      }
      else if(cell.column.field === "id"){
        cell.update(event.newSelection.value.id);
      }
    
  });
  this.commongridmodel.filter(x=>{
 
    x[field].push(event.newSelection.value["id"]);
  });
  this.commongridmodelrow.emit(this.commongridmodel);
  }

}
