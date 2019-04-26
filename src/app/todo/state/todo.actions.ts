import { NewTodoItem, TodoListItem, UpdateTodoItem, UpdateTodoItemState } from '../models/todo.model';
import { Action } from '@ngrx/store';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


export enum TodoActionsTypes {
    Load = '[Todo] Load',
    LoadSuccess = '[Todo] Load Success',
    LoadFail = '[Todo] Load Fail',
    Add = '[Todo] Add',
    AddSuccess = '[Todo] Add Success',
    AddFail = '[Todo] Add Fail',
    Delete = '[Todo] Delete',
    DeleteSuccess = '[Todo] Delete Success',
    DeleteFail= '[Todo] Delete Fail',
    Update = '[Todo] Update',
    UpdateSuccess = '[Todo] Update Success',
    UpdateFail = '[Todo] Update Fail',
    SetState = '[Todo] Set State',
    SetStateSuccess = '[Todo] Set State Success',
    SetStateFail = '[Todo] Set State Fail',
}

export class Load implements Action {
    readonly type = TodoActionsTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = TodoActionsTypes.LoadSuccess;

    constructor(public payload: TodoListItem[]) { }
}

export class LoadFail implements Action {
    readonly type = TodoActionsTypes.LoadFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export class Add implements Action {
    readonly type = TodoActionsTypes.Add;

    constructor(public payload: NewTodoItem) { }
}

export class AddSuccess implements Action {
    readonly type = TodoActionsTypes.AddSuccess;

    constructor() { }
}

export class AddFail implements Action {
    readonly type = TodoActionsTypes.AddFail;

    constructor(public payload: LocalizedErrorInfo) { }
}


export class Delete implements Action {
    readonly type = TodoActionsTypes.Delete;

    constructor(public payload: number) { }
}

export class DeleteSuccess implements Action {
    readonly type = TodoActionsTypes.DeleteSuccess;

    constructor() { }
}

export class DeleteFail implements Action {
    readonly type = TodoActionsTypes.DeleteFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export class Update implements Action {
    readonly type = TodoActionsTypes.Update;

    constructor(public payload: UpdateTodoItem) { }
}

export class UpdateSuccess implements Action {
    readonly type = TodoActionsTypes.UpdateSuccess;

    constructor() { }
}

export class UpdateFail implements Action {
    readonly type = TodoActionsTypes.UpdateFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export class SetState implements Action {
    readonly type = TodoActionsTypes.SetState;

    constructor(public payload: UpdateTodoItemState) { }
}

export class SetStateSuccess implements Action {
    readonly type = TodoActionsTypes.SetStateSuccess;

    constructor() { }
}

export class SetStateFail implements Action {
    readonly type = TodoActionsTypes.SetStateFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export type TodoActions =
    | Load
    | LoadSuccess
    | LoadFail
    | Add
    | AddSuccess
    | AddFail
    | Delete
    | DeleteFail
    | Update
    | UpdateSuccess
    | UpdateFail
    | SetState
    | SetStateSuccess
    | SetStateFail;
