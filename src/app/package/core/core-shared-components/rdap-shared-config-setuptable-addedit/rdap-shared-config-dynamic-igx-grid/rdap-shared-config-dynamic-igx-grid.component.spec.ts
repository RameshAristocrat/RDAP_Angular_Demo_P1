import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapSharedConfigDynamicIgxGridComponent } from './rdap-shared-config-dynamic-igx-grid.component';

describe('RdapSharedConfigDynamicIgxGridComponent', () => {
  let component: RdapSharedConfigDynamicIgxGridComponent;
  let fixture: ComponentFixture<RdapSharedConfigDynamicIgxGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapSharedConfigDynamicIgxGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapSharedConfigDynamicIgxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
