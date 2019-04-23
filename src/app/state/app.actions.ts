import { Action } from '@ngrx/store';
import { LoggedUser } from '../models/logged-user.model';


export enum AppActionsTypes {
    LoginSuccess = '[App] Login Success',
    Logout = '[App] Logout',
    LogoutSuccess = '[App] Logout Success',
    LogoutFail = '[App] Logout Fail',
}

export class LoginSuccess implements Action {
    readonly type = AppActionsTypes.LoginSuccess;

    constructor(public payload: LoggedUser) { }
}

export class Logout implements Action {
    readonly type = AppActionsTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = AppActionsTypes.LogoutSuccess;

    constructor() { }
}

export type AppActions =
    | LoginSuccess
    | Logout
    | LogoutSuccess;
