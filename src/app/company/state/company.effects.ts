import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../services/company.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as companyActions from './company.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { CompanyItem } from '../models/company.model';
import { LoginActionsTypes } from 'src/app/auth/state/login.actions';

@Injectable()
export class CompanyEffects {
    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ) {}

    @Effect()
    loadCompanies$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Load),
        switchMap(() =>
            this.companyService.getCompanyList().pipe(
                map(company => new companyActions.LoadSuccess(company)),
                catchError((err: LocalizedErrorInfo) =>
                    of(new companyActions.LoadFail(err))
                )
            )
        )
    );

    @Effect()
    loadCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.LoadCompany),
        switchMap((action: companyActions.LoadCompany) =>
            this.companyService
                .getCompany(action.payload)
                .pipe(
                    map(
                        company =>
                            new companyActions.LoadCompanySuccess(company)
                    )
                )
        )
    );

    @Effect()
    addNewCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Add),
        mergeMap((action: companyActions.Add) =>
            this.companyService.addNewCompany(action.payload).pipe(
                map(
                    newCompanyId =>
                        new companyActions.AddSuccess({
                            ...action.payload,
                            id: newCompanyId
                        } as CompanyItem)
                )
            )
        ),
        catchError((err: LocalizedErrorInfo) =>
            of(new companyActions.AddFail(err))
        )
    );

    @Effect()
    setCurrentCompanyAfterAddSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.AddSuccess),
        map(
            (action: companyActions.AddSuccess) =>
                new companyActions.SetCurrentCompany(action.payload.id)
        )
    );

    @Effect()
    updateCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Update),
        mergeMap((action: companyActions.Update) =>
            this.companyService.updateCompany(action.payload).pipe(
                map(
                    (updatedCompany: CompanyItem) =>
                        new companyActions.UpdateSuccess(updatedCompany)
                ),
                catchError((err: LocalizedErrorInfo) =>
                    of(new companyActions.UpdateFail(err))
                )
            )
        )
    );

    @Effect()
    deleteCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Delete),
        mergeMap((action: companyActions.Delete) =>
            this.companyService.deleteCompany(action.payload).pipe(
                map(() => new companyActions.DeleteSuccess()),
                catchError((err: LocalizedErrorInfo) =>
                    of(new companyActions.DeleteFail(err))
                )
            )
        )
    );

    @Effect()
    startProgress$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Load),
        map(() => new companyActions.StartProgress())
    );

    @Effect()
    stopProgress$: Observable<Action> = this.actions$.pipe(
        ofType(
            companyActions.CompanyActionsTypes.LoadSuccess,
            companyActions.CompanyActionsTypes.LoadFail
        ),
        map(() => new companyActions.StopProgress())
    );

    @Effect()
    reloadAfterChanges$: Observable<Action> = this.actions$.pipe(
        ofType(
            LoginActionsTypes.LoginSuccess,
            companyActions.CompanyActionsTypes.AddSuccess,
            companyActions.CompanyActionsTypes.UpdateSuccess,
            companyActions.CompanyActionsTypes.DeleteSuccess
        ),
        map(() => new companyActions.Load())
    );
}
