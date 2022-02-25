import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapBlanketPinDetailsComponent } from './rdap-blanketpin-details.component';

describe('RdapReworkFileTestComponent', () => {
  let component: RdapBlanketPinDetailsComponent;
  let fixture: ComponentFixture<RdapBlanketPinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapBlanketPinDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapBlanketPinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
