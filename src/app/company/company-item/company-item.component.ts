import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { CompanyItem } from '../models/company.model';
import { CompanyState } from '../state/company.state';
import * as companyActions from '../state/company.actions';

@Component({
    selector: 'kros-company-item',
    templateUrl: './company-item.component.html',
    styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {
    constructor(
    private store: Store<CompanyState>, 
     private router: Router) {}

    @Input() item: CompanyItem;

    ngOnInit() {}
    deleteCompany(id: number) {
        this.store.dispatch(new companyActions.Delete(id));
    }

    editCompany(id: number) {
        this.router.navigate(['settings', id]);
    }
    selectCompany(id: number) {
        this.store.dispatch(new companyActions.SetCurrentCompany(id));
    }
}
