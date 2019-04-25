import { TestBed } from '@angular/core/testing';

import { User.GuardService } from './user.guard.service';

describe('User.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User.GuardService = TestBed.get(User.GuardService);
    expect(service).toBeTruthy();
  });
});
