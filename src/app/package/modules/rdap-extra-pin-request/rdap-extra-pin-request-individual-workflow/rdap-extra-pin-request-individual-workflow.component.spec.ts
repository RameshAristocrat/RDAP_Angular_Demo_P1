import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapExtraPinRequestIndividualWorkflowComponent } from './rdap-extra-pin-request-individual-workflow.component';

describe('RdapExtraPinRequestIndividualWorkflowComponent', () => {
  let component: RdapExtraPinRequestIndividualWorkflowComponent;
  let fixture: ComponentFixture<RdapExtraPinRequestIndividualWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapExtraPinRequestIndividualWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapExtraPinRequestIndividualWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
