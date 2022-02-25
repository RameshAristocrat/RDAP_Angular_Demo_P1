import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinComponent } from './rdap-manage-pin.component';

describe('RdapManagePinComponent', () => {
  let component: RdapManagePinComponent;
  let fixture: ComponentFixture<RdapManagePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
