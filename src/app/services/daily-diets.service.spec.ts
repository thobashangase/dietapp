import { TestBed } from '@angular/core/testing';

import { DailyDietsService } from './daily-diets.service';

describe('DailyDietsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyDietsService = TestBed.get(DailyDietsService);
    expect(service).toBeTruthy();
  });
});
