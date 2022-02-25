import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapReworkAttachmentComponent } from './rdap-rework-attachment.component';

describe('RdapReworkFileTestComponent', () => {
  let component: RdapReworkAttachmentComponent;
  let fixture: ComponentFixture<RdapReworkAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapReworkAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapReworkAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
