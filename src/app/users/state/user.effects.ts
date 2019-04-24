import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as userActions from './user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
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
}
