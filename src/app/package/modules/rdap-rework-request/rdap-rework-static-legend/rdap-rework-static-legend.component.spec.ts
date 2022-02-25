import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkStaticLegendComponent } from './rdap-rework-static-legend.component';

describe('RdapReworkStaticLegendComponent', () => {
  let component: RdapReworkStaticLegendComponent;
  let fixture: ComponentFixture<RdapReworkStaticLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkStaticLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkStaticLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
