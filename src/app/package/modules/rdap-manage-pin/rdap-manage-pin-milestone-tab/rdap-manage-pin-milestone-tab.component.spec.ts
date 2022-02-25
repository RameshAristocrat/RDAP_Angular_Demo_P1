import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinMilestoneTabComponent } from './rdap-manage-pin-milestone-tab.component';

describe('RdapManagePinMilestoneTabComponent', () => {
  let component: RdapManagePinMilestoneTabComponent;
  let fixture: ComponentFixture<RdapManagePinMilestoneTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinMilestoneTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinMilestoneTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
