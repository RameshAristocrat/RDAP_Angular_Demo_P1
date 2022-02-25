import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinSetItemsTabComponent } from './rdap-manage-pin-set-items-tab.component';

describe('RdapManagePinSetItemsTabComponent', () => {
  let component: RdapManagePinSetItemsTabComponent;
  let fixture: ComponentFixture<RdapManagePinSetItemsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinSetItemsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinSetItemsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
