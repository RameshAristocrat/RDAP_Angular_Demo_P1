import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapSharedConfigSetuptableViewComponent } from './rdap-shared-config-setuptable-view.component';

describe('RdapSharedConfigSetuptableViewComponent', () => {
  let component: RdapSharedConfigSetuptableViewComponent;
  let fixture: ComponentFixture<RdapSharedConfigSetuptableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapSharedConfigSetuptableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapSharedConfigSetuptableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
