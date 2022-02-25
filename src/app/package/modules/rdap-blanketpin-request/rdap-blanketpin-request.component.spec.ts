import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapBlanketPinRequestComponent } from './rdap-blanketpin-request.component';

describe('RdapBlanketPinRequestComponent', () => {
  let component: RdapBlanketPinRequestComponent;
  let fixture: ComponentFixture<RdapBlanketPinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapBlanketPinRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapBlanketPinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
