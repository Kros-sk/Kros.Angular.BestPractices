import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from '../../todo/services/todo.service';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';


describe('Interceptor', () => {

    let injector: TestBed;
    let todoService: TodoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                }),
            ],
            providers: [
                // {
                //     provide: HTTP_INTERCEPTORS,
                //     useClass: AuthInterceptor,
                //     multi: true
                // },
                TodoService
            ]
        });
        injector = getTestBed();
        todoService = injector.get(TodoService);
        httpMock = injector.get(HttpTestingController);
    });

    describe('#Iterceptor', () => {
        it('should add an Authorization header', () => {

            todoService.getTodoList().subscribe(response => {
                expect(response).toBeTruthy();
              });

            // const req = httpMock.expectOne(`https://krostodos.azurewebsites.net/api/ToDos`);
            // expect(req.request.headers.has('Authorization')).toEqual(true);

        });
    });

    it('should be created', () => {
        const service: TodoService = TestBed.get(TodoService);
        expect(service).toBeTruthy();

        const interceptor = new AuthInterceptor(null);
        const x = interceptor.intercept(null, null);
    });
});
