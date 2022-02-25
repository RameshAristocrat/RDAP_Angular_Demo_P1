import { Component, OnInit, ViewChild } from '@angular/core';
//import {LegendData } from   'src/assets/config/reworkStaticData';
import { GridPagingMode, IgxColumnComponent, IgxGridComponent } from 'igniteui-angular';

import { environment } from "src/environments/environment";
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';

@Component({
  selector: 'app-rdap-rework-static-legend',
  templateUrl: './rdap-rework-static-legend.component.html',
  styleUrls: ['./rdap-rework-static-legend.component.scss']
})
export class RdapReworkStaticLegendComponent implements OnInit {
  public legendData: any[];
  public col: IgxColumnComponent;
  public pWidth: string;
  public nWidth: string;
  public searchUrl;
  public perPage: number;
  public baseApi;
  public searchParam;
  public totalCount = 0;
  public data: any; //Observable<any[]>;
  public mode = GridPagingMode.Remote;
  @ViewChild("grid1", { static: true }) public grid1: IgxGridComponent;
  
  private _dataLengthSubscriber;
  
  constructor(private masterApiService: RdMasterApiService) {
   
   
    
  }

  public onResize(event) {
    this.col = event.column;
    this.pWidth = event.prevWidth;
    this.nWidth = event.newWidth;
}


public ngOnInit() {

}






}
