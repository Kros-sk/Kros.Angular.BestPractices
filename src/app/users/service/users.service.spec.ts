import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({
            }),
        ]
    }));

    it('should be created', () => {
        const service: UsersService = TestBed.get(UsersService);
        expect(service).toBeTruthy();
    });
});
