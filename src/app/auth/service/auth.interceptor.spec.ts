import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from '../../todo/services/todo.service';
import { StoreModule } from '@ngrx/store';

describe('Interceptor', () => {

    let injector: TestBed;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                }),
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                TodoService
            ]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
    });

    describe('#Iterceptor', () => {
        it('should add an Authorization header', () => {


            const req = httpMock.expectOne(`https://krostodos.azurewebsites.net/api/ToDos`);
            expect(req.request.headers.has('Authorization')).toEqual(true);

        });
    });

    it('should be created', () => {
        const service: TodoService = TestBed.get(TodoService);
        expect(service).toBeTruthy();

        const interceptor = new AuthInterceptor(null);
        const x = interceptor.intercept(null, null);
    });
});
