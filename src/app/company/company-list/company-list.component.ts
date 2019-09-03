import { Component, OnInit } from '@angular/core';
import { CompanyState } from '../state/company.state';
import { Store, select } from '@ngrx/store';
import * as companyActions from '../state/company.actions';
import { Actions, ofType } from '@ngrx/effects';
import { CompanyItem } from '../models/company.model';
import { Observable } from 'rxjs';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import * as fromCompany from '../state/company.selectors';
import { AddCompanyItemComponent } from '../add-company-item/add-company-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'kros-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

    constructor(
        private store: Store<CompanyState>,
        private action$: Actions,
        private modalService: NgbModal
    ) {
    }

    displayList: CompanyItem[];
    errorMessage$: Observable<LocalizedErrorInfo | null>;
    currentCompanyId: number;
    progress$: Observable<boolean>;

    ngOnInit() {
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
        this.store.dispatch(new companyActions.Load());
        this.store.pipe(select(fromCompany.getCompanyList)).subscribe(
            (companyItems: CompanyItem[]) => {
                this.displayList = companyItems;
            });

        this.store.pipe(select(fromCompany.getCurrentCompany)).subscribe(
            (currentCompany: CompanyItem) => {
                if (currentCompany != null) {
                    this.currentCompanyId = currentCompany.id;
                } else {
                    this.currentCompanyId = 0;
                }
            }
        );

        this.progress$ = this.store.pipe(select(fromCompany.getCompaniesLoadProgress));
    }

    companySelected(company: CompanyItem) {
        this.store.dispatch(new companyActions.SetCurrentCompany(company));
    }

    addCompany() {
        const modalRef = this.modalService.open(AddCompanyItemComponent, {
            size: 'lg',
            centered: true
          });
    }

}
