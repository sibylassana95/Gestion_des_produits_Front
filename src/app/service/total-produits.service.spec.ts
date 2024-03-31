import { TestBed } from '@angular/core/testing';

import { TotalProduitsService } from './total-produits.service';

describe('TotalProduitsService', () => {
  let service: TotalProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
