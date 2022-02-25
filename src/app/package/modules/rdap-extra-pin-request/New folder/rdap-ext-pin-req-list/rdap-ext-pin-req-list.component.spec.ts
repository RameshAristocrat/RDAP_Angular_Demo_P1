import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapExtPinReqListComponent } from './rdap-ext-pin-req-list.component';

describe('RdapExtPinReqListComponent', () => {
  let component: RdapExtPinReqListComponent;
  let fixture: ComponentFixture<RdapExtPinReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapExtPinReqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapExtPinReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
