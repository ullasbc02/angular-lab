import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';

describe('authGuard', () => {
  const executeGuard = () => TestBed.runInInjectionContext(() => TestBed.inject(AuthGuard));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
