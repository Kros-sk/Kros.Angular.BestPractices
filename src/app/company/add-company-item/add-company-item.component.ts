import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as companyActions from '../state/company.actions';
import { CompanyState } from '../state/company.state';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kros-add-company-item',
    templateUrl: './add-company-item.component.html',
    styleUrls: ['./add-company-item.component.scss']
})
export class AddCompanyItemComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<CompanyState>,
        private actions$: Actions,
        private modalService: NgbModal
    ) { }

    companyForm: FormGroup;
    progress$: Observable<boolean>;

    ngOnInit() {
        this.companyForm = this.formBuilder.group({
            businessId: ['', Validators.required],
            companyName: ['', Validators.required],
            street: [],
            streetNumber: [],
            city: [],
            zipCode: []
        });
        this.actions$.pipe(
            ofType(companyActions.CompanyActionsTypes.AddSuccess)
        ).subscribe(
            () => this.companyForm.reset()
        );
    }

    addNewCompany() {
        this.store.dispatch(new companyActions.Add({
            userId: 0,
            businessId: this.companyForm.value.businessId,
            companyName: this.companyForm.value.companyName,
            street: this.companyForm.value.street,
            streetNumber: this.companyForm.value.streetNumber,
            city: this.companyForm.value.city,
            zipCode: this.companyForm.value.zipCode,
        }));
        this.modalService.dismissAll();
    }
    close(){
        this.modalService.dismissAll();
    }

}
