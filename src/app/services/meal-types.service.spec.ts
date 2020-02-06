import { TestBed } from '@angular/core/testing';

import { MealTypesService } from './meal-types.service';

describe('MealTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealTypesService = TestBed.get(MealTypesService);
    expect(service).toBeTruthy();
  });
});
