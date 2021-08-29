import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { isEmptyString, isNotEmptyVal } from 'src/app/package/modules/rdap-shared-components/utils/shared-utils';
import { RdApiMasterRegionService } from 'src/app/package/api/apicontroller/mastercontroller/rd_api_master_region.service';

import { environment } from "src/environments/environment";
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import { filterModel, searchParamModel } from 'src/app/package/api/model/param/searchParam';
import { isNotEmptyString, _isNotEmptyString, _isNotEmptyVal } from '../../utils/shared-utils';
import { isNotNull } from '@igniteui/material-icons-extended';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import { BehaviourSubjectService } from '../../services/behaviour-subject.service';

@Component({
  selector: 'app-rdap-shared-config-setuptable-view',
  templateUrl: './rdap-shared-config-setuptable-view.component.html',
  styleUrls: ['./rdap-shared-config-setuptable-view.component.scss']
})
export class RdapSharedConfigSetuptableViewComponent implements OnInit {
  selMasterDetails: any;
  appString:any[];
  viewdata:any[];
  constructor(private behaviourService: BehaviourSubjectService, private router: Router) {
    this.behaviourService.getViewSelectedMasterDetails().subscribe(data => {
      this.selMasterDetails = data;
    });
  }

  ngOnInit(): void {
    this.appString = [];
    this.viewdata=[];
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
      console.log("this.appString grid", this.appString)
    }
    this.selMasterDetails = JSON.parse(localStorage.getItem("selMasterViewData"));
    Object.keys(this.selMasterDetails.added[0]).forEach(x => {
      this.appString.filter(g => {
        if (x == g.modelname) {
          this.viewdata.push({ field: x, title: g.title,hidden: g.gridcolflag,value:this.selMasterDetails.added[0][x] });
        }
      });
    });
    //Object.keys(this.selMasterDetails.added[0]);
    console.log(Object.keys(this.selMasterDetails.added[0]))
    console.log("this.selMasterDetails", JSON.parse(localStorage.getItem("selMasterViewData")));
  }

}
