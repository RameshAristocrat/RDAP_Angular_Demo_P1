import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapManagePinDependenciesTabComponent } from './rdap-manage-pin-dependencies-tab.component';

describe('RdapManagePinDependenciesTabComponent', () => {
  let component: RdapManagePinDependenciesTabComponent;
  let fixture: ComponentFixture<RdapManagePinDependenciesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapManagePinDependenciesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapManagePinDependenciesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
