import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as todoActions from './todo.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService) { }

    @Effect()
    loadTodos$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Load),
        mergeMap(action => this.todoService.getTodoList().pipe(
            map(todos => (new todoActions.LoadSuccess(todos))),
            catchError((err: LocalizedErrorInfo) => of(new todoActions.LoadFail(err)))
        ))
    );

    @Effect()
    addNewTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Add),
        mergeMap((action: todoActions.Add) =>
            this.todoService.addNewTodo(action.payload).pipe(
                map(() => (new todoActions.Load())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.AddFail(err)))
            ),
        )
    );

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Delete),
        mergeMap((action: todoActions.Delete) =>
            this.todoService.deleteTodo(action.payload).pipe(
                map(() => (new todoActions.Load())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.DeleteFail(err)))
            ),
        )
    );

    @Effect()
    updateTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Update),
        mergeMap((action: todoActions.Update) =>
            this.todoService.updateTodo(action.payload).pipe(
                map(() => (new todoActions.Load())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.UpdateFail(err)))
            ),
        )
    );

    // @Effect()
    // addNewTodo$: Observable<Action> = this.actions$.pipe(
    //     ofType(todoActions.TodoActionsTypes.Add),
    //     mergeMap(this.addNewTodo)
    // );

    // private addNewTodo(action: todoActions.Add): Observable<Action> {
    //     return this.todoService.addNewTodo(action.payload).pipe(
    //         map(() => (new todoActions.Load())),
    //         catchError((err: LocalizedErrorInfo) => of(new todoActions.AddFail(err)))
    //     );
    // }
}
