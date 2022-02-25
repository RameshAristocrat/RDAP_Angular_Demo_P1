import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkReqListComponent } from './rdap-rework-request-list.component';

describe('RdapReworkReqListComponent', () => {
  let component: RdapReworkReqListComponent;
  let fixture: ComponentFixture<RdapReworkReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkReqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
