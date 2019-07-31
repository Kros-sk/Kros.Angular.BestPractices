import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { NgbModal, NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { CompanyState } from '../state/company.state';
import { Store } from '@ngrx/store';
import * as companyActions from 'src/app/company/state/company.actions';
import { CompanyActionsTypes } from '../state/company.actions';

@Component({
    selector: 'kros-edit-company-item',
    templateUrl: './edit-company-item.component.html',
    styleUrls: ['./edit-company-item.component.scss']
})
export class EditCompanyItemComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
        private modalService: NgbModal,
        private store: Store<CompanyState>
    ) { }
    progress: boolean;
    companyForm: FormGroup;
    userId: number;

    @Input() itemId: number;

    ngOnInit() {
        this.progress = false;
        this.companyForm = this.formBuilder.group({
            businessId: ['', Validators.required],
            companyName: ['', Validators.required],
            street: [],
            streetNumber: [],
            city: [],
            zipCode: []
        });

        this.companyService.getCompany(this.itemId).subscribe(item => {
            this.companyForm.patchValue({
                businessId: item.businessId,
                companyName: item.companyName,
                street: item.street,
                streetNumber: item.streetNumber,
                city: item.city,
                zipCode: item.zipCode
            });
            this.userId = item.userId;
            this.progress = true;
        });
    }
    save() {
        this.store.dispatch(new companyActions.Update({
            id: this.itemId,
            userId: this.userId,
            businessId: this.companyForm.value.businessId,
            companyName: this.companyForm.value.companyName,
            street: this.companyForm.value.street,
            streetNumber: this.companyForm.value.streetNumber,
            city: this.companyForm.value.city,
            zipCode: this.companyForm.value.zipCode
        }));
        this.modalService.dismissAll();
    }
    close() {
        this.modalService.dismissAll();
    }
}
