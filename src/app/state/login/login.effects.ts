import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import * as loginActions from './login.actions';
import { mergeMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';


@Injectable()
export class AppEffects {
    constructor(private actions$: Actions,
                private authService: AuthService) { }
    @Effect()
    logoutUser$: Observable<Action> = this.actions$.pipe(
        ofType(loginActions.LoginActionsTypes.Logout),
        mergeMap(action => from(this.authService.logOut())
            .pipe(
                map(() => new loginActions.LogoutSuccess())
            )
        )
    );
}
