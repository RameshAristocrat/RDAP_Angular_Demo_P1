import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkRequestComponent } from './rdap-rework-request.component';

describe('RdapReworkRequestComponent', () => {
  let component: RdapReworkRequestComponent;
  let fixture: ComponentFixture<RdapReworkRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
