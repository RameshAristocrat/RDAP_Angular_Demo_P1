import { TestBed } from '@angular/core/testing';

import { Textbox_ValidationService } from './textbox_validation.service';

describe('Textbox.ValidationService', () => {
  let service: Textbox_ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Textbox_ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
