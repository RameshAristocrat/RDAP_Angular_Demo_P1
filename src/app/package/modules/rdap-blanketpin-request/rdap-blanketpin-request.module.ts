import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RdapBlanketPinRequestComponent } from './rdap-blanketpin-request.component';
import { MaterialModule } from '../../mat-modules/material.module';
import { configRoutes } from '../configs/rdap-configs.routing';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxAutocompleteModule, IgxDropDownModule, IgxInputGroupModule } from 'igniteui-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlanketPinRequestRoutes } from './rdap-blanketpin-request_routing';

@NgModule({
  declarations: [
    RdapBlanketPinRequestComponent,
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
    BlanketPinRequestRoutes],
  exports: [RdapBlanketPinRequestComponent],
  providers: [],
  bootstrap: [],
})
export class RdapBlanketpinRequestModule { }
