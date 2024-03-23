import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { updateProfilGuard } from './update-profil.guard';

describe('updateProfilGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => updateProfilGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
