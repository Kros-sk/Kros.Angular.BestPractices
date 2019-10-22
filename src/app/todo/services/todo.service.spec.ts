import { TestBed, getTestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

xdescribe('TodoService', () => {
    let injector: TestBed;
    let todoService: TodoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [TodoService]
        });
        injector = getTestBed();
        todoService = injector.get(TodoService);
        httpMock = injector.get(HttpTestingController);
    });

    describe('#getTodo', () => {
        it('should return an Observable<Todo[]>', () => {
            const todoList = [
                {
                    id: 1,
                    name: 'string',
                    isDone: false,
                    progress: false
                },
                {
                    id: 2,
                    name: 'AHOJ',
                    isDone: true,
                    progress: true
                }
            ];

            todoService.getTodoList().subscribe(todo => {
                expect(todo.length).toBe(2);
                expect(todo).toEqual(todoList);
            });

            const req = httpMock.expectOne(`${environment.apiUrl}/ToDos`);
            expect(req.request.method).toBe('GET');
            req.flush(todoList);
        });
    });

    it('should be created', () => {
        const service: TodoService = TestBed.get(TodoService);
        expect(service).toBeTruthy();
    });
});
