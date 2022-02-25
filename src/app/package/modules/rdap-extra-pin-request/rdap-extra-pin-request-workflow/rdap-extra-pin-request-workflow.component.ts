import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { timeout } from 'rxjs/operators';
declare function load(): any;
@Component({
  selector: 'app-rdap-extra-pin-request-workflow',
  templateUrl: './rdap-extra-pin-request-workflow.component.html',
  styleUrls: ['./rdap-extra-pin-request-workflow.component.scss']
})
export class RdapExtraPinRequestWorkflowComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() pinId: any;
  @Input() workflowflag;
  viewExtrapinRequestData: any;
  @Output() workflowEvent = new EventEmitter<any>();
  constructor() { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.pinId) {
      load();
    }
  }
  ngDoheck():void{
    if (this.pinId) {
      load();
    }
  }


}
