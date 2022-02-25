import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { timeout } from 'rxjs/operators';
declare function load(): any;
@Component({
  selector: 'app-rdap-extra-pin-request-individual-workflow',
  templateUrl: './rdap-extra-pin-request-individual-workflow.component.html',
  styleUrls: ['./rdap-extra-pin-request-individual-workflow.component.scss']
})
export class RdapExtraPinRequestIndividualWorkflowComponent implements OnInit, AfterViewInit, OnChanges {
  viewExtrapinRequestData: any;
  constructor() { }
  ngAfterViewInit(): void {
    load();
  }

  ngOnInit(): void {
    //load();
  }

  ngOnChanges(): void {
      //load();
  }
  ngDoheck():void{
      //load();
  }


}
