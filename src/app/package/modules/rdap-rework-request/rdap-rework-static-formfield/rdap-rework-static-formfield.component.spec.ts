import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkStaticFormfieldComponent } from './rdap-rework-static-formfield.component';

describe('RdapReworkStaticFormfieldComponent', () => {
  let component: RdapReworkStaticFormfieldComponent;
  let fixture: ComponentFixture<RdapReworkStaticFormfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkStaticFormfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkStaticFormfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
