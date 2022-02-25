import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  isEmptyString,
  isNotEmptyVal,
} from 'src/app/package/modules/rdap-shared-components/utils/shared-utils';
import { RdApiMasterRegionService } from 'src/app/package/api/apicontroller/mastercontroller/rd_api_master_region.service';

import { environment } from 'src/environments/environment';
import { RdMasterApiService } from 'src/app/package/api/apiservice/masterApiService';
import {
  filterModel,
  searchParamModel,
  sortModel,
} from 'src/app/package/api/model/param/searchParam';
import {
  isNotEmptyString,
  _isNotEmptyString,
  _isNotEmptyVal,
} from '../../utils/shared-utils';
import { isNotNull } from '@igniteui/material-icons-extended';
import * as condata from 'src/assets/config/masterScreenSearchCommonConfig';
import * as appstringdata from 'src/assets/config/app-string';
import * as numbersearchdata from 'src/assets/config/numberSearchCriteria';
import * as stringsearchdata from 'src/assets/config/stringSearchCriteria';
import { BehaviourSubjectService } from '../../services/behaviour-subject.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RdSpinnerService } from 'src/app/package/infoservice/spinnerservice/rd-spinner.service';
@Component({
  selector: 'app-rdap-shared-config-search',
  templateUrl: './rdap-shared-config-search.component.html',
  styleUrls: ['./rdap-shared-config-search.component.scss'],
})
export class RdapSharedConfigSearchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() onSearchSumbit = new EventEmitter<any>();
  public panelOpenState = true;
  public configdata;
  public routedata;
  public formdata;
  public griddata;
  public baseApi;
  public searchUrl;
  public addUrl;
  public deleteUrl;
  public editUrl;
  public searchFilterData;
  public selMasterDetailsData;
  public searchOrderBy: any;

  timeOut = 500;

  searchform: FormGroup;

  formName: string;
  route: string;
  routeName: string;
  formGroupArr: any[];
  formSelectApiData: any[];
  selectedResult: any;
  gridsource: any[];
  tempFilterData: any[];
  displayedColumns: string[];
  loopGridContent: any[];
  routers: Router;
  exportfilename: string;
  searchGridData: any[];
  totalCount:any;
  appString: any;
  searchParam: searchParamModel;
  sortparam: sortModel;
  sortparamarr: sortModel[];
  filterparam: filterModel;
  filterparamarr: filterModel[];
  stringSearchCriteria: any[];
  numberSearchCriteria: any[];
  pagename:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpClient: HttpClient,
    location: Location,
    private _router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private masterApiService: RdMasterApiService,
    private masterRegionService: RdApiMasterRegionService,
    private behaviourService: BehaviourSubjectService,
    private spinner: RdSpinnerService
  ) {
    this.baseApi = environment.baseapiurl;
    this.stringSearchCriteria = [];
    this.numberSearchCriteria = [];
    _router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
        this.routeName =
          this.route.split('/')[this.route.split('/').length - 1];
      } else {
        this.route = 'Home';
      }
    });
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.spinner.show();
    this.pagename = "master";
    this.appString = [];
    if (condata.configJsonData) {
      this.configdata = condata.configJsonData;
      this.getFormData();
    }
    if (appstringdata.appString) {
      this.appString = appstringdata.appString;
    }
    if (numbersearchdata.numberSearch) {
      this.numberSearchCriteria = numbersearchdata.numberSearch;
    }
    if (stringsearchdata.stringSearch) {
      this.stringSearchCriteria = stringsearchdata.stringSearch;
    }
    this.spinner.hide();
    //appstringdata
  }
  getFormData() {
    this.formSelectApiData = [];
    this.sortparam = { field: '', direction: '' };
    this.sortparamarr = [];
    if (this.route.match('studio2') && this.route.match('studio2').length > 0) {
      this.exportfilename = 'studio2_master_data';
      this.formName = 'studio2SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.studio2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'studio2Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('studiotype') &&
      this.route.match('studiotype').length > 0
    ) {
      this.exportfilename = 'studiotype_master_data';
      this.formName = 'studiotypeSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.studiotype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'studiotypeId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('studio') &&
      this.route.match('studio').length > 0
    ) {
      this.exportfilename = 'studio_master_data';
      this.formName = 'studioSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.studio;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'studioId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('version') &&
      this.route.match('version').length > 0
    ) {
      this.exportfilename = 'version_master_data';
      this.formName = 'versionSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.version;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'versionId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (this.route.match('epp') && this.route.match('epp').length > 0) {
      this.exportfilename = 'epp_master_data';
      this.formName = 'eppSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.epp;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'EppRefId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('region') &&
      this.route.match('region').length > 0
    ) {
      //this.searchUrl = this.baseApi;
      this.exportfilename = 'region_master_data';
      this.formName = 'regionSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.region;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'regionId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('pool') &&
      this.route.match('pool').length > 0
    ) {
      this.exportfilename = 'pool_master_data';
      this.formName = 'poolSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.pool;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'poolId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('prodcat1') &&
      this.route.match('prodcat1').length > 0
    ) {
      this.exportfilename = 'prodcat1_master_data';
      this.formName = 'prodcat1SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.prodcat1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'prodcat1Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('prodcat2') &&
      this.route.match('prodcat2').length > 0
    ) {
      this.exportfilename = 'prodcat2_master_data';
      this.formName = 'prodcat2SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.prodcat2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'prodcat2Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('prodcat3') &&
      this.route.match('prodcat3').length > 0
    ) {
      this.exportfilename = 'prodcat3_master_data';
      this.formName = 'prodcat3SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.prodcat3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'prodcat3Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('status1') &&
      this.route.match('status1').length > 0
    ) {
      this.exportfilename = 'status1_master_data';
      this.formName = 'status1SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.status1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'status1Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('status2') &&
      this.route.match('status2').length > 0
    ) {
      this.exportfilename = 'status2_master_data';
      this.formName = 'status2SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.status2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'status2Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('devtype1') &&
      this.route.match('devtype1').length > 0
    ) {
      this.exportfilename = 'devtype1_master_data';
      this.formName = 'devtype1SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.devtype1;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'Devtype1Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('devtype2') &&
      this.route.match('devtype2').length > 0
    ) {
      this.exportfilename = 'devtype2_master_data';
      this.formName = 'devtype2SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.devtype2;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'devtype2Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('channeltype') &&
      this.route.match('channeltype').length > 0
    ) {
      this.exportfilename = 'channeltype_master_data';
      this.formName = 'channeltypeSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.channeltype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'channeltypeId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('cabinets') &&
      this.route.match('cabinets').length > 0
    ) {
      this.exportfilename = 'cabinets_master_data';
      this.formName = 'cabinetsSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.cabinets;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'cabinetId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('channel') &&
      this.route.match('channel').length > 0
    ) {
      this.exportfilename = 'channel_master_data';
      this.formName = 'channelSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.channel;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'channelId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('devefforttype') &&
      this.route.match('devefforttype').length > 0
    ) {
      this.exportfilename = 'devefforttype_master_data';
      this.formName = 'devefforttypeSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.devefforttype;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'devefforttypeId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('devcomplexity') &&
      this.route.match('devcomplexity').length > 0
    ) {
      this.exportfilename = 'devcomplexity_master_data';
      this.formName = 'devcomplexitySearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.devcomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'devcomplexityId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('market') &&
      this.route.match('market').length > 0
    ) {
      this.exportfilename = 'market_master_data';
      this.formName = 'marketSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.market;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'marketId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('status3') &&
      this.route.match('status3').length > 0
    ) {
      this.exportfilename = 'status3_master_data';
      this.formName = 'status3SearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.status3;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'status3Id', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
         
      });
      this.createFormControl();
    } else if (
      this.route.match('gravity') &&
      this.route.match('gravity').length > 0
    ) {
      this.exportfilename = 'gravity_master_data';
      this.formName = 'gravitySearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.gravity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'gravityId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('financialyear') &&
      this.route.match('financialyear').length > 0
    ) {
      this.exportfilename = 'financialyear_master_data';
      this.formName = 'financialyearSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.financialyear;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'financialyearId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('quarter') &&
      this.route.match('quarter').length > 0
    ) {
      this.exportfilename = 'quarter_master_data';
      this.formName = 'quarterSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.quarter;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'quarterId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('devcomplexity') &&
      this.route.match('devcomplexity').length > 0
    ) {
      this.exportfilename = 'devcomplexity_master_data';
      this.formName = 'devcomplexitySearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.devcomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'devcomplexityId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('pool') &&
      this.route.match('pool').length > 0
    ) {
      this.exportfilename = 'pool_master_data';
      this.formName = 'poolSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.pool;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'poolId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('gamecomplexity') &&
      this.route.match('gamecomplexity').length > 0
    ) {
      this.exportfilename = 'gamecomplexity_master_data';
      this.formName = 'gamecomplexitySearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.gamecomplexity;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'gamecomplexityId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('productbasket') &&
      this.route.match('productbasket').length > 0
    ) {
      this.exportfilename = 'productbasket_master_data';
      this.formName = 'productbasketSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.productbasket;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'productbasketId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('emulation') &&
      this.route.match('emulation').length > 0
    ) {
      this.exportfilename = 'emulation_master_data';
      this.formName = 'emulationSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.emulation;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'emulationId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('denom') &&
      this.route.match('denom').length > 0
    ) {
      this.exportfilename = 'denom_master_data';
      this.formName = 'denomSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.denom;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'denomId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('theme') &&
      this.route.match('theme').length > 0
    ) {
      this.exportfilename = 'theme_master_data';
      this.formName = 'themeSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.theme;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'themeId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('title') &&
      this.route.match('title').length > 0
    ) {
      this.exportfilename = 'title_master_data';
      this.formName = 'titleSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.title;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'titleId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('productgroup') &&
      this.route.match('productgroup').length > 0
    ) {
      this.exportfilename = 'productgroup_master_data';
      this.formName = 'productgroupSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.productgroup;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'productgroupId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('risk') &&
      this.route.match('risk').length > 0
    ) {
      this.exportfilename = 'risk_master_data';
      this.formName = 'riskSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.risk;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'riskId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    } else if (
      this.route.match('viridianlaunch') &&
      this.route.match('viridianlaunch').length > 0
    ) {
      this.exportfilename = 'viridianlaunch_master_data';
      this.formName = 'viridianlaunchSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.viridianlaunch;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'viridianlaunchId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    }
    else if (
      this.route.match('vidstep') &&
      this.route.match('vidstep').length > 0
    ) {
      this.exportfilename = 'vidstep_master_data';
      this.formName = 'vidstepSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.vidstep;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'vidstepId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    }
    else if (
      this.route.match('flag') &&
      this.route.match('flag').length > 0
    ) {
      this.exportfilename = 'flag_master_data';
      this.formName = 'flagSearchForm';
      this.configdata[0].master.filter((x) => {
        this.routedata = x.flag;
        this.formdata = this.routedata[0].fieldprop;
        this.griddata = this.routedata[0].api[0];
        this.searchUrl = this.baseApi + this.routedata[0].searchApi[0].url;
        this.sortparam = { field: 'flagId', direction: 'ASC' };
        this.sortparamarr.push(this.sortparam);
      });
      this.createFormControl();
    }
  }
  generateParam() {
    // this.param = {
    //   pageNumber: 0,
    //   pageSize: 0,
    //   filters: [
    //     {
    //       field: "Region",
    //       operator: "Contains",
    //       value: ""
    //     }
    //   ]
    // }
  }
  submit() {
      this.spinner.show();
      this.searchParam = { pageNumber: 1, pageSize: 10, filters: [], sorts: [] };
      this.filterparamarr = [];
      this.searchParam.sorts = this.sortparamarr;
      this.formdata.forEach((x, index) => {
        this.filterparam = { field: '', operator: '', value: '' };
        if (
          (x.type == 'text' || x.type == 'textarea') &&
          _isNotEmptyString(this.searchform.get(x.formcontrolname).value)
        ) {
          this.filterparam.field = x.field;
          this.filterparam.operator = this.searchform
            .get(x.searchcriteria.formcontrolname)
            .value.toString();
          this.filterparam.value = this.searchform
            .get(x.formcontrolname)
            .value.toString();
          this.filterparamarr.push(this.filterparam);
          this.searchParam.filters = this.filterparamarr;
        } else if (
          x.type == 'select' &&
          _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)
        ) {
          this.filterparam.field = x.field;
          this.filterparam.operator = this.searchform
            .get(x.searchcriteria.formcontrolname)
            .value.toString();
          this.filterparam.value = this.searchform
            .get(x.formcontrolname)
            .value.toString();
          this.filterparamarr.push(this.filterparam);
          this.searchParam.filters = this.filterparamarr;
        }
        else if (
          x.type == 'number' &&
          _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)
        ) {
          this.filterparam.field = x.field;
          this.filterparam.operator = this.searchform
            .get(x.searchcriteria.formcontrolname)
            .value.toString();
          this.filterparam.value = this.searchform
            .get(x.formcontrolname)
            .value.toString();
          this.filterparamarr.push(this.filterparam);
          this.searchParam.filters = this.filterparamarr;
        }
      });
      this.gridDataLoad(this.sortparamarr, this.filterparamarr)
  }
    submitold() {
      this.formGroupArr = [];
      this.gridsource = [];
      this.displayedColumns = [];
      this.loopGridContent = [];
      this.displayedColumns.push('select');
      let count = 1;
      let errorFlag = false;
      let temp = this.masterRegionService.regionSearch().subscribe((x) => {
      });
      if (this.searchform.invalid) {
        return;
      }
      this.searchGridData = [];
      this.gridsource = [];
      this.httpClient
      .get('assets/config/search-data-mockup.json')
      .subscribe((data) => {
        this.gridsource.push(data);
        this.gridsource.filter((x) => {
          x.filter((y) => {
            if ('studio' == y.pagename) {
              this.searchGridData = y.data;
            }
          });
        });
      });
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.searchform.controls[controlName].hasError(errorName);
  };
  createFormControl() {
    let frmgrp = {};
    this.formdata.forEach((x) => {
      if (x.type == 'select') {
        let ddlurl = '';

        if (x.field == 'startdate' || x.field == 'enddate') ddlurl = x.api;
        else ddlurl = this.baseApi + x.api;

        this.masterApiService.masterSearchDDL(ddlurl).subscribe((data) => {
          x.apidata = data;
        });
        frmgrp[x.formcontrolname] = new FormControl('');
        frmgrp[x.searchcriteria.formcontrolname] = new FormControl('Contains');
      } 
     else if (x.type == 'number') {
      if (x.required == 'required') {
        frmgrp[x.formcontrolname] = new FormControl('', Validators.required);
      } else {
        frmgrp[x.formcontrolname] = new FormControl('');
      }
      frmgrp[x.searchcriteria.formcontrolname] = new FormControl('Equal');
      } 
      else {
        if (x.required == 'required') {
          frmgrp[x.formcontrolname] = new FormControl('', Validators.required);
        } else {
          frmgrp[x.formcontrolname] = new FormControl('');
        }
        frmgrp[x.searchcriteria.formcontrolname] = new FormControl('Contains');
      }
    });
    this.searchform = new FormGroup(frmgrp);
    this.spinner.hide();
  }
  openSnackBar(errormsg: string) {
    this._snackBar.open(errormsg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
      panelClass: ['warn-snackbar'],
    });
  }
  addnewrecord(url) {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('search', 'add');
    this._router.navigate([tempUrl.toString()]);
  }
  viewrecord(url) {
    let tempUrl;
    let selMasterData;
    tempUrl = this.route.replace('search', 'view');
    this._router.navigate([tempUrl.toString()]);
  }
  cancel(url) {
    this._router.navigate([url]);
  }
  onSelGridRowData(event) {
    this.selMasterDetailsData = event;
    localStorage.setItem(
      'selMasterViewData',
      JSON.stringify(this.selMasterDetailsData.added[0])
    );
  }
  reset() {
    this.filterparamarr = [];
    this.createFormControl();
    this.gridDataLoad(this.sortparamarr);
  }
  gridDataLoad(sortparamarr?, filterparamarr?) {
    this.filterparamarr = filterparamarr ? filterparamarr: [];
    this.searchGridData = [];
    this.masterApiService.getData().subscribe(data => {
      if (data) {
        this.searchGridData.push(...data);
        this.totalCount = this.searchGridData.length;
        this.spinner.hide();
      }
    });
    this.masterApiService.getGridData(this.searchUrl,sortparamarr, this.filterparamarr);
  }
  onPageChangeEvent(pageNumber: number) {
    //this.spinner.show();
    if(pageNumber == undefined || pageNumber == 0)
    {
      this.searchParam = { pageNumber: 1, pageSize: 10, filters: [], sorts: [] };
      this.filterparamarr = [];
      this.searchParam.sorts = this.sortparamarr;
    }
    else{
      this.searchParam = { pageNumber: pageNumber + 1, pageSize: 10, filters: [], sorts: [] };
    this.filterparamarr = [];
    this.searchParam.sorts = this.sortparamarr;
    this.formdata.forEach((x, index) => {
      this.filterparam = { field: '', operator: '', value: '' };
      if (
        (x.type == 'text' || x.type == 'textarea') &&
        _isNotEmptyString(this.searchform.get(x.formcontrolname).value)
      ) {
        this.filterparam.field = x.field;
        this.filterparam.operator = this.searchform
          .get(x.searchcriteria.formcontrolname)
          .value.toString();
        this.filterparam.value = this.searchform
          .get(x.formcontrolname)
          .value.toString();
        this.filterparamarr.push(this.filterparam);
        this.searchParam.filters = this.filterparamarr;
      } else if (
        x.type == 'select' &&
        _isNotEmptyVal(this.searchform.get(x.formcontrolname).value)
      ) {
        this.filterparam.field = x.field;
        this.filterparam.operator = this.searchform
          .get(x.searchcriteria.formcontrolname)
          .value.toString();
        this.filterparam.value = this.searchform
          .get(x.formcontrolname)
          .value.toString();
        this.filterparamarr.push(this.filterparam);
        this.searchParam.filters = this.filterparamarr;
      }
    });
    
    }
    
     this.masterApiService.masterSearch(this.searchUrl, this.searchParam).subscribe(x => {
       this.searchGridData = x.data;
       this.totalCount = x.totalRecords;
     });
     
  }
}
