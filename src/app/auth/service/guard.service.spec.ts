import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { GuardService } from './guard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({
            }),
        ],
    }));

    it('should be created', () => {
        const service: GuardService = TestBed.get(GuardService);
        expect(service).toBeTruthy();
    });
});
