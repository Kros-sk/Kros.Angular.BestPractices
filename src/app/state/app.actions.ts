import { Action } from '@ngrx/store';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { LoggedUser } from '../models/logged-user.model';


export enum AppActionsTypes {
    Login = '[App] Login',
    LoginSuccess = '[App] Login Success',
    LoginFail = '[App] Login Fail',
    Logout = '[App] Logout',
    LogoutSuccess = '[App] Logout Success',
    LogoutFail = '[App] Logout Fail',
}

export class Login implements Action {
    readonly type = AppActionsTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = AppActionsTypes.LoginSuccess;

    constructor(public payload: LoggedUser) { }
}

export class LoginFail implements Action {
    readonly type = AppActionsTypes.LoginFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export class Logout implements Action {
    readonly type = AppActionsTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = AppActionsTypes.LogoutSuccess;

    constructor() { }
}


export type AppActions =
    | Login
    | LoginSuccess
    | LoginFail
    | Logout
    | LogoutSuccess;
