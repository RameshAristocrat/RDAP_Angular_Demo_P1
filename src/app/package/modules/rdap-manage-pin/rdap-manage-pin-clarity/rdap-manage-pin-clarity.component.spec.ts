import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinClarityComponent } from './rdap-manage-pin-clarity.component';

describe('RdapManagePinClarityComponent', () => {
  let component: RdapManagePinClarityComponent;
  let fixture: ComponentFixture<RdapManagePinClarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinClarityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinClarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
