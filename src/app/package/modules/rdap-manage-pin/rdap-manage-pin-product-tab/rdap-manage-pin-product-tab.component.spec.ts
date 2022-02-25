import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinProductTabComponent } from './rdap-manage-pin-product-tab.component';

describe('RdapManagePinProductTabComponent', () => {
  let component: RdapManagePinProductTabComponent;
  let fixture: ComponentFixture<RdapManagePinProductTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinProductTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinProductTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
