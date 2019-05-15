import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({
            }),
        ],
    }));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
