import { TestBed } from '@angular/core/testing';

import { CalculeService } from './calcule.service';

describe('CalculeService', () => {
  let service: CalculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
