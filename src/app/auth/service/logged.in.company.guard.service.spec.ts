import { TestBed } from '@angular/core/testing';

import { LoggedInCompanyGuardService } from './logged.in.company.guard.service';

xdescribe('LoggedInCompanyGuardServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: LoggedInCompanyGuardService = TestBed.get(
            LoggedInCompanyGuardService
        );
        expect(service).toBeTruthy();
    });
});
