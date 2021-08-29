import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapConfigCommonViewComponent } from './rdap-config-common-view.component';

describe('RdapConfigCommonViewComponent', () => {
  let component: RdapConfigCommonViewComponent;
  let fixture: ComponentFixture<RdapConfigCommonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapConfigCommonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapConfigCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
