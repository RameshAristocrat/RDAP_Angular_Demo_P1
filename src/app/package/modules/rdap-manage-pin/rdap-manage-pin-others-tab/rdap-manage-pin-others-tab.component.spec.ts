import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinOthersTabComponent } from './rdap-manage-pin-others-tab.component';

describe('RdapManagePinOthersTabComponent', () => {
  let component: RdapManagePinOthersTabComponent;
  let fixture: ComponentFixture<RdapManagePinOthersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinOthersTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinOthersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
