import { Action } from '@ngrx/store';
import { LoggedUser } from '../models/logged-user.model';


export enum LoginActionsTypes {
    LoginSuccess = '[Login] Login Success',
    LoginFail = '[Login] Login Fail',
    Logout = '[Login] Logout',
    LogoutSuccess = '[Login] Logout Success',
    LogoutFail = '[Login] Logout Fail',
}

export class LoginSuccess implements Action {
    readonly type = LoginActionsTypes.LoginSuccess;

    constructor(public payload: LoggedUser) { }
}

export class LoginFail implements Action {
    readonly type = LoginActionsTypes.LoginFail;
}

export class Logout implements Action {
    readonly type = LoginActionsTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = LoginActionsTypes.LogoutSuccess;

    constructor() { }
}

export type LoginActions =
    | LoginSuccess
    | LoginFail
    | Logout
    | LogoutSuccess;
