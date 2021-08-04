import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdapSharedIgxGridSearchResultComponent } from './rdap-shared-igx-grid-search-result.component';

describe('RdapSharedIgxGridSearchResultComponent', () => {
  let component: RdapSharedIgxGridSearchResultComponent;
  let fixture: ComponentFixture<RdapSharedIgxGridSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdapSharedIgxGridSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdapSharedIgxGridSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
