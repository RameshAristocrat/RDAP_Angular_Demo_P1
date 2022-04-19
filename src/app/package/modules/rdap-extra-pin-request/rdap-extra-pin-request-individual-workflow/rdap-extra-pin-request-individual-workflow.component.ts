import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
declare function loadDev(): any;
declare function loadProd(): any;
declare function loadQA(): any;

@Component({
  selector: 'app-rdap-extra-pin-request-individual-workflow',
  templateUrl: './rdap-extra-pin-request-individual-workflow.component.html',
  styleUrls: ['./rdap-extra-pin-request-individual-workflow.component.scss']
})
export class RdapExtraPinRequestIndividualWorkflowComponent implements OnInit, AfterViewInit {
  viewExtrapinRequestData: any;
  constructor() { }
  ngAfterViewInit(): void {
    if(environment.production){
      
      loadProd()
    }
    else if(environment.qa){
      loadQA()
    }
    else{
      loadDev();
    }
  }

  ngOnInit(): void {
  }
}
