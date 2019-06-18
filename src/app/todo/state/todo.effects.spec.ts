import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, empty } from 'rxjs';
import * as todoActions from './todo.actions';
import { TodoEffects } from './todo.effects';
import { TodoService } from '../services/todo.service';


describe('Todo Effects', () => {
    let actions: Observable<any>;
    let effects: TodoEffects;
    let todoService: TodoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TodoEffects,
                provideMockActions(() => actions),
                {
                    provide: TodoService,
                }
            ]
        });
        effects = TestBed.get(TodoEffects);
        todoService = TestBed.get(TodoService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
      });
});
