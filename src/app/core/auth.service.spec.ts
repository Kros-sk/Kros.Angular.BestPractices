import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({
            }),
        ],
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
