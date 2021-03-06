import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as todoActions from './todo.actions';
import { mergeMap, map, catchError, switchMap, concatMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) {
    }

    @Effect()
    loadTodos$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Load),
        switchMap(() => this.todoService.getTodoList().pipe(
            map(todos => (new todoActions.LoadSuccess(todos))),
            catchError((err: LocalizedErrorInfo) => of(new todoActions.LoadFail(err)))
        ))
    );

    @Effect()
    addNewTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Add),
        mergeMap((action: todoActions.Add) =>
            this.todoService.addNewTodo(action.payload).pipe(
                map(() => (new todoActions.AddSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.AddFail(err)))
            ),
        )
    );

    @Effect()
    deleteTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Delete),
        mergeMap((action: todoActions.Delete) =>
            this.todoService.deleteTodo(action.payload).pipe(
                map(() => (new todoActions.DeleteSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.DeleteFail(err)))
            ),
        )
    );

    @Effect()
    deleteCompletedTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.DeleteCompleted),
        mergeMap((action: todoActions.DeleteCompleted) =>
            this.todoService.deleteCompletedTodo().pipe(
                map(() => (new todoActions.DeleteCompletedSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.DeleteCompletedFail(err)))
            ),
        )
    );

    @Effect()
    updateTodo$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Update),
        concatMap((action: todoActions.Update) =>
            this.todoService.updateTodo(action.payload).pipe(
                map(() => (new todoActions.UpdateSuccess(action.payload))),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.UpdateFail(err)))
            ),
        )
    );

    @Effect()
    setTodoState$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.SetState),
        concatMap((action: todoActions.SetState) =>
            this.todoService.setTodoDoneState(action.payload.id, action.payload.isDone).pipe(
                map(() => (new todoActions.SetStateSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new todoActions.SetStateFail(err)))
            ),
        )
    );

    @Effect()
    reloadAfterChanges$: Observable<Action> = this.actions$.pipe(
        ofType(
            todoActions.TodoActionsTypes.SetFilter,
            todoActions.TodoActionsTypes.AddSuccess,
            todoActions.TodoActionsTypes.DeleteSuccess,
            todoActions.TodoActionsTypes.DeleteCompletedSuccess,
            todoActions.TodoActionsTypes.SetStateSuccess),
        map(() => new todoActions.Load())
    );

    @Effect()
    showProgressIndicatorIfDeleting$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Delete),
        map((x: todoActions.Delete) => new todoActions.SetProgressItem(x.payload))
    );

    @Effect()
    showProgressIndicatorIfUpdating$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Update),
        map((x: todoActions.Update) => new todoActions.SetProgressItem(x.payload.id))
    );

    @Effect()
    showProgressIndicatorIfAddNewItem$: Observable<Action> = this.actions$.pipe(
        ofType(todoActions.TodoActionsTypes.Add),
        map(() => new todoActions.SetProgressFormAdd(true))
    );

    @Effect()
    hideProgressIndicatorIfAddNewItem$: Observable<Action> = this.actions$.pipe(
        ofType(
            todoActions.TodoActionsTypes.AddFail,
            todoActions.TodoActionsTypes.AddSuccess),
        map(() => new todoActions.SetProgressFormAdd(false))
    );
}
