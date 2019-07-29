import { Component, OnInit } from '@angular/core';
import { CompanyState } from '../state/company.state';
import { Store, select } from '@ngrx/store';
import * as companyActions from '../state/company.actions';
import { Actions, ofType } from '@ngrx/effects';
import { CompanyItem } from '../models/company.model';
import { Observable } from 'rxjs';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { getError, getCompanyList } from '../state/company.selectors';
import { CompanyActionsTypes } from '../state/company.actions';

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

  ngOnInit() {
    this.progress = true;
    this.errorMessage$ = this.store.pipe(select(getError));
    this.store.dispatch(new companyActions.Load());
    this.store.pipe(select(getCompanyList)).subscribe(
      (companyItems: CompanyItem[]) => {
        this.displayList = companyItems;
      });
    this.action$.pipe(
      ofType(companyActions.CompanyActionsTypes.LoadFail, companyActions.CompanyActionsTypes.LoadSuccess)
    ).subscribe(
      () => {
        this.progress = false;
      }
    );
  }

}
