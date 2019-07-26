import { Action } from '@ngrx/store';
import { CompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export enum CompanyActionsTypes {
    Load = '[Company] Load company items',
    LoadSuccess = '[Company] Load company items Success',
    LoadFail = '[Company] Load company items Fail',
    Add = '[Company] Add new company item',
    AddSuccess = '[Company] Add new company item Success',
    AddFail = '[Company] Add new company item Fail',
}

export class Load implements Action {
    readonly type = CompanyActionsTypes.Load
}

export class LoadSuccess implements Action {
    readonly type = CompanyActionsTypes.LoadSuccess

    constructor (public payload: CompanyItem[]){}
}

export class LoadFail implements Action {
    readonly type = CompanyActionsTypes.LoadFail

    constructor (public payload: LocalizedErrorInfo){}
}

export class Add implements Action {
    readonly type = CompanyActionsTypes.Load
    
    constructor (public payload: CompanyItem){}
}

export class AddSuccess implements Action {
    readonly type = CompanyActionsTypes.LoadSuccess
}

export class AddFail implements Action {
    readonly type = CompanyActionsTypes.LoadFail

    constructor (public payload: LocalizedErrorInfo){}
}