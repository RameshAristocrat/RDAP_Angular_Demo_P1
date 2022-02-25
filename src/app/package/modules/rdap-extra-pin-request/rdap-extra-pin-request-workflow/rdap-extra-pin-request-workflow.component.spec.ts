import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapExtraPinRequestWorkflowComponent } from './rdap-extra-pin-request-workflow.component';

describe('RdapExtraPinRequestWorkflowComponent', () => {
  let component: RdapExtraPinRequestWorkflowComponent;
  let fixture: ComponentFixture<RdapExtraPinRequestWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapExtraPinRequestWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapExtraPinRequestWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
