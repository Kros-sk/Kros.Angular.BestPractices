import { Todo } from '../models/todo.model';
import { Action } from '@ngrx/store';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


export enum TodoActionsTypes {
    Load = '[Todo] Load',
    LoadSuccess = '[Todo] Load Success',
    LoadFail = '[Todo] Load Fail',
}

export class Load implements Action {
    readonly type = TodoActionsTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = TodoActionsTypes.LoadSuccess;

    constructor(public payload: Todo[]) { }
}

export class LoadFail implements Action {
    readonly type = TodoActionsTypes.LoadFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export type TodoActions =
    | Load
    | LoadSuccess
    | LoadFail;
