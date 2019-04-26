import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserGuardService } from './user.guard.service';
import { StoreModule } from '@ngrx/store';

describe('User.GuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({
            }),
        ],
    }));

    it('should be created', () => {
        const service: UserGuardService = TestBed.get(UserGuardService);
        expect(service).toBeTruthy();
    });
});
