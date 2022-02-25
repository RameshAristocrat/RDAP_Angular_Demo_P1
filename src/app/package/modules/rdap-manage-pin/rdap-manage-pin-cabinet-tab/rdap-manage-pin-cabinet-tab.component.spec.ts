import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinCabinetTabComponent } from './rdap-manage-pin-cabinet-tab.component';

describe('RdapManagePinCabinetTabComponent', () => {
  let component: RdapManagePinCabinetTabComponent;
  let fixture: ComponentFixture<RdapManagePinCabinetTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinCabinetTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinCabinetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
