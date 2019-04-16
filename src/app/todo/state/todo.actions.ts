import { Todo } from '../models/todo.model';
import { Action } from '@ngrx/store';


export enum TodoActionsTypes {
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail',
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

    constructor(public payload: string) { }
}


export type TodoActions =
    | Load
    | LoadSuccess
    | LoadFail;
