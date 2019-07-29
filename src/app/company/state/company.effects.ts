import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../services/company.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as companyActions from './company.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

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
    reloadAfterChanges$: Observable<Action> = this.actions$.pipe(
        ofType(
            companyActions.CompanyActionsTypes.AddSuccess,
        ),
        map(() => new companyActions.Load())
    );
}