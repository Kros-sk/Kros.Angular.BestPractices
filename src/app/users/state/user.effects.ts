import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as userActions from './user.actions';
import * as progressActions from '../../state/progress/progress.actions';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { UsersService } from '../service/users.service';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UsersService) { }

    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.Load),
        mergeMap(action => this.userService.getAllUsers().pipe(
            map(users => (new userActions.LoadSuccess(users))),
            catchError((err: LocalizedErrorInfo) => of(new userActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.Update),
        concatMap((action: userActions.Update) =>
            this.userService.updateUser(action.payload).pipe(
                map(() => (new userActions.UpdateSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new userActions.UpdateFail(err)))
            ),
        )
    );

    @Effect()
    reloadUser$: Observable<Action> = this.actions$.pipe(
        ofType(
            userActions.UserActionTypes.UpdateSuccess),
        map(() => new userActions.Load()
        )
    );

    @Effect()
    showProgressIndicatorUser$: Observable<Action> = this.actions$.pipe(
        ofType(
            userActions.UserActionTypes.Load,
            userActions.UserActionTypes.Update
            ),
        map(() => new progressActions.SetActionInProgress(true))
    );

    @Effect()
    hideProgressIndicatorUser$: Observable<Action> = this.actions$.pipe(
        ofType(
            userActions.UserActionTypes.LoadSuccess,
            userActions.UserActionTypes.LoadFail,
            userActions.UserActionTypes.UpdateFail,
            userActions.UserActionTypes.UpdateSuccess
            ),
        map(() => new progressActions.SetActionInProgress(false))
    );
}
