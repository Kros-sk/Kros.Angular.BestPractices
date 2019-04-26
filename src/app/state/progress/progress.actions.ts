import { Action } from '@ngrx/store';

export enum ProgressActionsTypes {
    SetActionInProgress = '[Progress] Set Action in Progress'
}


export class SetActionInProgress implements Action {
    readonly type = ProgressActionsTypes.SetActionInProgress;

    constructor(public payload: boolean) { }
}

export type ProgressActions =
    | SetActionInProgress;
