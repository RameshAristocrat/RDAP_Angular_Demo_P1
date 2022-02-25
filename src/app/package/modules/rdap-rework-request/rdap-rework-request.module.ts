import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RdapReworkRequestComponent } from './rdap-rework-request.component';

import { MaterialModule } from '../../mat-modules/material.module'; //'../../mat-modules/material.module';
import { configRoutes } from '../configs/rdap-configs.routing';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule } from 'igniteui-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RdapReworkAttachmentComponent } from './rdap-rework-attachment/rdap-rework-attachment.component';
import { RdapReworkDetailsComponent, AutocompletePipeStartsWith } from './rdap-rework-details/rdap-rework-details.component';
import { RdapReworkReqListComponent } from './rdap-rework-request-list/rdap-rework-request-list.component';
import { ReworkRequestRoutes } from './rdap-rework-request_routing';
import { RdapReworkStaticFormfieldComponent } from './rdap-rework-static-formfield/rdap-rework-static-formfield.component';
import { RdapReworkStaticLegendComponent } from './rdap-rework-static-legend/rdap-rework-static-legend.component';


@NgModule({
  declarations: [
    RdapReworkRequestComponent,
    RdapReworkDetailsComponent,
    RdapReworkStaticLegendComponent,
    RdapReworkStaticFormfieldComponent,
    RdapReworkAttachmentComponent,
    AutocompletePipeStartsWith,
    RdapReworkReqListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    configRoutes,
    CoreModule,
    ReworkRequestRoutes],

  exports: [RdapReworkRequestComponent],
  providers: [],
  bootstrap: [],
})
export class RdapReworkRequestModule { }
