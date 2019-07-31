import { TestBed } from '@angular/core/testing';

import { LoggedInCompanyGuardServiceService } from './logged.in.company.guard.service';

describe('LoggedInCompanyGuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedInCompanyGuardServiceService = TestBed.get(LoggedInCompanyGuardServiceService);
    expect(service).toBeTruthy();
  });
});
