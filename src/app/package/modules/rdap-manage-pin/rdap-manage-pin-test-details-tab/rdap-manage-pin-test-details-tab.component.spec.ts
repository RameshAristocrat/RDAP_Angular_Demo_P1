import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinTestDetailsTabComponent } from './rdap-manage-pin-test-details-tab.component';

describe('RdapManagePinTestDetailsTabComponent', () => {
  let component: RdapManagePinTestDetailsTabComponent;
  let fixture: ComponentFixture<RdapManagePinTestDetailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinTestDetailsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinTestDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
