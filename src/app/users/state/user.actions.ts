import { Action } from '@ngrx/store';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { User } from '../models/user.model';

export enum UserActionTypes {
    Load = '[User] Load',
    LoadSuccess = '[User] Load Success',
    LoadFail = '[User] Load Fail',
}


export class Load implements Action {
    readonly type = UserActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = UserActionTypes.LoadSuccess;

    constructor(public payload: User[]) { }
}

export class LoadFail implements Action {
    readonly type = UserActionTypes.LoadFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export type UserActions =
    | Load
    | LoadSuccess
    | LoadFail;


