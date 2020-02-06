import { TestBed } from '@angular/core/testing';

import { DesertsService } from './deserts.service';

describe('DesertsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesertsService = TestBed.get(DesertsService);
    expect(service).toBeTruthy();
  });
});
