import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as todoActions from './todo.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class InvoiceEffects {
    constructor(private actions$: Actions,
                private todoService: TodoService) { }

    @Effect()
    loadTodos$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Load),
        mergeMap(action => this.todoService.getTodoList().pipe(
            map(todos => (new todoActions.LoadSuccess(todos))),
            catchError(err => of(new todoActions.LoadFail(err)))
        )
        ));
}
