import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinAuditLogsTabComponent } from './rdap-manage-pin-audit-logs-tab.component';

describe('RdapManagePinAuditLogsTabComponent', () => {
  let component: RdapManagePinAuditLogsTabComponent;
  let fixture: ComponentFixture<RdapManagePinAuditLogsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinAuditLogsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinAuditLogsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
