import { TestBed } from '@angular/core/testing';

import { UserGuardService } from './user.guard.service';

describe('User.GuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: UserGuardService = TestBed.get(UserGuardService);
        expect(service).toBeTruthy();
    });
});
