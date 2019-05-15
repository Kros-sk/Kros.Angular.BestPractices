import { NewTodoItem, TodoListItem, UpdateTodoItem, UpdateTodoItemState } from '../models/todo.model';
import { Action } from '@ngrx/store';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export enum TodoActionsTypes {
    Load = '[Todo] Load todo items',
    LoadSuccess = '[Todo] Load todo items Success',
    LoadFail = '[Todo] Load todo items Fail',
    Add = '[Todo] Add new todo item',
    AddSuccess = '[Todo] Add new todo item Success',
    AddFail = '[Todo] Add new todo item Fail',
    Delete = '[Todo] Delete todo item',
    DeleteSuccess = '[Todo] Delete todo item Success',
    DeleteFail = '[Todo] Delete todo item Fail',
    DeleteCompleted = '[Todo] Delete all completed todo items',
    DeleteCompletedSuccess = '[Todo] Delete all completed todo items Success',
    DeleteCompletedFail = '[Todo] Delete all completed todo items Fail',
    Update = '[Todo] Update todo item',
    UpdateSuccess = '[Todo] Update todo item Success',
    UpdateFail = '[Todo] Update todo item Fail',
    SetState = '[Todo] Set todo item is done State',
    SetStateSuccess = '[Todo] Set todo item is done State Success',
    SetStateFail = '[Todo] Set todo item is done State Fail',
    SetFilter = '[Todo] Set todo items Filter ',
    SetProgressItem = '[Todo] Set progress bar at item',
    SetProgressFormAdd = '[Todo] Set progress bar at add form',
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

export class DeleteCompleted implements Action {
    readonly type = TodoActionsTypes.DeleteCompleted;
}

export class DeleteCompletedSuccess implements Action {
    readonly type = TodoActionsTypes.DeleteCompletedSuccess;

    constructor() { }
}

export class DeleteCompletedFail implements Action {
    readonly type = TodoActionsTypes.DeleteCompletedFail;

    constructor(public payload: LocalizedErrorInfo) { }
}

export class Update implements Action {
    readonly type = TodoActionsTypes.Update;

    constructor(public payload: UpdateTodoItem) { }
}

export class UpdateSuccess implements Action {
    readonly type = TodoActionsTypes.UpdateSuccess;

    constructor(public payload: UpdateTodoItem) { }
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

export class SetFilter implements Action {
    readonly type = TodoActionsTypes.SetFilter;

}

export class SetProgressItem implements Action {
    readonly type = TodoActionsTypes.SetProgressItem;

    constructor(public payload: number) { }
}

export class SetProgressFormAdd implements Action {
    readonly type = TodoActionsTypes.SetProgressFormAdd;

    constructor(public payload: boolean) { }
}


export type TodoActions =
    | SetProgressFormAdd
    | SetProgressItem
    | SetFilter
    | Load
    | LoadSuccess
    | LoadFail
    | Add
    | AddSuccess
    | AddFail
    | Delete
    | DeleteSuccess
    | DeleteFail
    | DeleteCompleted
    | DeleteCompletedSuccess
    | DeleteCompletedFail
    | Update
    | UpdateSuccess
    | UpdateFail
    | SetState
    | SetStateSuccess
    | SetStateFail;
