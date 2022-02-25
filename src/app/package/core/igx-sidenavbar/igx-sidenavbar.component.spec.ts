import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgxSidenavbarComponent } from './igx-sidenavbar.component';

describe('IgxSidenavbarComponent', () => {
  let component: IgxSidenavbarComponent;
  let fixture: ComponentFixture<IgxSidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgxSidenavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgxSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
