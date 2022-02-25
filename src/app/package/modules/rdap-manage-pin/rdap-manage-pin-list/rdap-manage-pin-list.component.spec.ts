import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinListComponent } from './rdap-manage-pin-list.component';

describe('RdapManagePinListComponent', () => {
  let component: RdapManagePinListComponent;
  let fixture: ComponentFixture<RdapManagePinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
