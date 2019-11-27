import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CompanyState } from '../state/company.state';
import * as companyActions from '../state/company.actions';
import { CompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import * as fromCompany from '../state/company.selectors';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';

@Component({
    selector: 'kros-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    constructor(
        private store: Store<CompanyState>,
        private modalService: NgbModal
    ) {}

    companies$: Observable<CompanyItem[]>;
    errorMessage$: Observable<LocalizedErrorInfo | null>;
    currentCompanyId: number;
    progress$: Observable<boolean>;
    private companiesCount = null;

    ngOnInit() {
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));

        this.progress$ = this.store.pipe(
            select(fromCompany.getCompaniesLoadProgress)
        );

        this.companies$ = this.store.pipe(
            select(fromCompany.getCompanyList),
            map(companies =>
                companies.sort((a, b) =>
                    a.organizationName.localeCompare(b.organizationName)
                )
            ),
            tap(companies => {
                companies.map(() =>
                    this.companiesCount = this.companiesCount + 1
                );
                if (this.companiesCount === 0) {
                    this.addCompany();
                } else {
                    this.companiesCount = 0;
                }
            }
            )
        );

        this.store
            .pipe(select(fromCompany.getCurrentCompany))
            .subscribe((currentCompany: CompanyItem) => {
                if (currentCompany) {
                    this.currentCompanyId = currentCompany.id;
                } else {
                    this.currentCompanyId = 0;
                }
            });

        this.store.dispatch(new companyActions.Load());
    }

    addCompany() {
        this.modalService.open(CompanyDetailComponent, {
            size: 'lg',
            centered: true
        });
    }
}
