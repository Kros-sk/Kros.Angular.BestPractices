import { Component, OnInit } from '@angular/core';
import { CompanyState } from '../state/company.state';
import { Store, select } from '@ngrx/store';
import * as companyActions from '../state/company.actions';
import { Actions, ofType } from '@ngrx/effects';
import { CompanyItem } from '../models/company.model';
import { Observable } from 'rxjs';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { getError, getCompanyList, getCurrentCompany } from '../state/company.selectors';
import { tap } from 'rxjs/operators';


@Component({
    selector: 'kros-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    constructor(
        private store: Store<CompanyState>,
        private action$: Actions,
    ) {
    }

    displayList: CompanyItem[];
    errorMessage$: Observable<LocalizedErrorInfo | null>;
    progress: boolean;
    currentCompanyId: number;

    ngOnInit() {
        this.progress = true;
        this.errorMessage$ = this.store.pipe(select(getError));
        this.store.dispatch(new companyActions.Load());
        this.store.pipe(select(getCompanyList)).subscribe(
            (companyItems: CompanyItem[]) => {
                this.displayList = companyItems;
            });

        this.store.pipe(select(getCurrentCompany)).subscribe(
            (currentCompany: CompanyItem) => {
                if (currentCompany != null) {
                    this.currentCompanyId = currentCompany.id;
                } else {
                    this.currentCompanyId = 0;
                }
            }
        );

        this.action$.pipe(
            ofType(companyActions.CompanyActionsTypes.LoadFail,
                   companyActions.CompanyActionsTypes.LoadSuccess),
            ).subscribe(() => { this.progress = false; });
    }

    companySelected(company: CompanyItem) {
        this.store.dispatch(new companyActions.SetCurrentCompany(company));
    }

}
