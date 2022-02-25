import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgxHeaderComponent } from './igx-header.component';

describe('IgxHeaderComponent', () => {
  let component: IgxHeaderComponent;
  let fixture: ComponentFixture<IgxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgxHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
