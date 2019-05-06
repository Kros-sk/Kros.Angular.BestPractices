import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as progressActions from '../../state/progress/progress.actions';
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
                map( () => (new todoActions.UpdateSuccess(action.payload))),
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
    showProgressIndicator$: Observable<Action> = this.actions$.pipe(
        ofType(
            todoActions.TodoActionsTypes.Load,
            todoActions.TodoActionsTypes.Add,
            todoActions.TodoActionsTypes.Delete,
            todoActions.TodoActionsTypes.DeleteCompleted,
            todoActions.TodoActionsTypes.Update,
            todoActions.TodoActionsTypes.SetState),
        map(() => new progressActions.SetActionInProgress(true))
    );

    @Effect()
    hideProgressIndicator$: Observable<Action> = this.actions$.pipe(
        ofType(
            todoActions.TodoActionsTypes.LoadSuccess,
            todoActions.TodoActionsTypes.LoadFail,
            todoActions.TodoActionsTypes.AddFail,
            todoActions.TodoActionsTypes.DeleteFail,
            todoActions.TodoActionsTypes.DeleteCompletedFail,
            todoActions.TodoActionsTypes.UpdateFail,
            todoActions.TodoActionsTypes.UpdateSuccess,
            todoActions.TodoActionsTypes.SetStateFail),
        map(() => new progressActions.SetActionInProgress(false))
    );
}
