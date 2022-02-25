import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkDetailsComponent } from './rdap-rework-details.component';

describe('RdapReworkDetailsComponent', () => {
  let component: RdapReworkDetailsComponent;
  let fixture: ComponentFixture<RdapReworkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
