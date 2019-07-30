import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../services/company.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as companyActions from './company.actions';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { CompanyItem } from '../models/company.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable()
export class CompanyEffects{
    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ){        
    }

    @Effect()
    loadCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Load),
        switchMap(() => this.companyService.getCompanyList().pipe(
            map(company => (new companyActions.LoadSuccess(company))),
            catchError((err: LocalizedErrorInfo) => of(new companyActions.LoadFail(err)))
        ))
    );

    @Effect()
    addNewCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Add),
        mergeMap((action: companyActions.Add) =>
            this.companyService.addNewCompany(action.payload).pipe(
                map(() => (new companyActions.AddSuccess())),
                catchError((err: LocalizedErrorInfo) => of(new companyActions.AddFail(err)))
            ),
        )
    );

    @Effect()
    updateCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Update),
        mergeMap((action: companyActions.Update) => 
        this.companyService.updateCompany(action.payload).pipe(
            map((updatedCompany: CompanyItem) => (new companyActions.UpdateSuccess(updatedCompany))),
            catchError((err: LocalizedErrorInfo) => of(new companyActions.UpdateFail(err)))
        ))
    );

    @Effect()
    deleteCompany$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyActionsTypes.Delete),
        mergeMap((action: companyActions.Delete) =>
        this.companyService.deleteCompany(action.payload).pipe(
            map(() => (new companyActions.DeleteSuccess)),
            catchError((err: LocalizedErrorInfo) => of (new companyActions.DeleteFail(err)))
        ))
    );

    @Effect()
    reloadAfterChanges$: Observable<Action> = this.actions$.pipe(
        ofType(
            companyActions.CompanyActionsTypes.AddSuccess,
            companyActions.CompanyActionsTypes.UpdateSuccess,
            companyActions.CompanyActionsTypes.DeleteSuccess,
        ),
        map(() => new companyActions.Load())
    );
}