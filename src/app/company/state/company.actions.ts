import { Action } from '@ngrx/store';
import { CompanyItem, AddCompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export enum CompanyActionsTypes {
    Load = '[Company] Load company items',
    LoadSuccess = '[Company] Load company items Success',
    LoadFail = '[Company] Load company items Fail',
    Add = '[Company] Add new company item',
    AddSuccess = '[Company] Add new company item Success',
    AddFail = '[Company] Add new company item Fail',
    Delete = '[Company] Delete company item',
    DeleteSuccess = '[Company] Delete company item Success',
    DeleteFail = '[Company] Delete company item Fail',
    Update = '[Company] Update company item',
    UpdateSuccess = '[Company] Update company item Success',
    UpdateFail = '[Company] Update company item Fail',
    SetCurrentCompany = '[Company] Set current company',
    StartProgress = '[Company] Start progress bar',
    StopProgress = '[Company] Stop progress bar'
}

export class Load implements Action {
    readonly type = CompanyActionsTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = CompanyActionsTypes.LoadSuccess;

    constructor(public payload: CompanyItem[]) {}
}

export class LoadFail implements Action {
    readonly type = CompanyActionsTypes.LoadFail;

    constructor(public payload: LocalizedErrorInfo) {}
}

export class Add implements Action {
    readonly type = CompanyActionsTypes.Add;

    constructor(public payload: AddCompanyItem) {}
}

export class AddSuccess implements Action {
    readonly type = CompanyActionsTypes.AddSuccess;

    constructor(public payload: CompanyItem) {}
}

export class AddFail implements Action {
    readonly type = CompanyActionsTypes.AddFail;

    constructor(public payload: LocalizedErrorInfo) {}
}

export class Update implements Action {
    readonly type = CompanyActionsTypes.Update;

    constructor(public payload: CompanyItem) {}
}

export class UpdateSuccess implements Action {
    readonly type = CompanyActionsTypes.UpdateSuccess;

    constructor(public payload: CompanyItem) {}
}

export class UpdateFail implements Action {
    readonly type = CompanyActionsTypes.UpdateFail;

    constructor(public payload: LocalizedErrorInfo) {}
}

export class Delete implements Action {
    readonly type = CompanyActionsTypes.Delete;

    constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
    readonly type = CompanyActionsTypes.DeleteSuccess;
}

export class DeleteFail implements Action {
    readonly type = CompanyActionsTypes.DeleteFail;

    constructor(public payload: LocalizedErrorInfo) {}
}

export class SetCurrentCompany implements Action {
    readonly type = CompanyActionsTypes.SetCurrentCompany;

    constructor(public currentCompany: CompanyItem) {}
}

export class StartProgress implements Action {
    readonly type = CompanyActionsTypes.StartProgress;
}

export class StopProgress implements Action {
    readonly type = CompanyActionsTypes.StopProgress;
}

export type CompanyActions =
    | Load
    | LoadSuccess
    | LoadFail
    | Add
    | AddSuccess
    | AddFail
    | Update
    | UpdateSuccess
    | UpdateFail
    | Delete
    | DeleteSuccess
    | DeleteFail
    | SetCurrentCompany
    | StartProgress
    | StopProgress;
