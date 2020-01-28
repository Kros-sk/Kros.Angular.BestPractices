import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { CompanyService } from '../services/company.service';
import { CompanyState } from '../state/company.state';
import * as companyActions from 'src/app/company/state/company.actions';
import { CompanyItem, AddCompanyItem } from '../models/company.model';

@Component({
    selector: 'kros-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
        private modalService: NgbModal,
        private store: Store<CompanyState>
    ) {}

    isLoaded: boolean;
    companyForm: FormGroup;
    userId: number;
    @Input() companyId: number;

    ngOnInit() {
        this.isLoaded = false;
        this.companyForm = this.formBuilder.group({
            businessId: ['', Validators.required],
            organizationName: ['', Validators.required],
            street: [],
            streetNumber: [],
            city: [],
            zipCode: []
        });

        if (this.companyId) {
            // TODO: netreba requestovat nanovo, malo by stacit vytiahnut zo state
            this.companyService.getCompany(this.companyId).subscribe(item => {
                this.companyForm.patchValue({
                    businessId: item.businessId,
                    organizationName: item.organizationName,
                    street: item.street,
                    streetNumber: item.streetNumber,
                    city: item.city,
                    zipCode: item.zipCode
                });
                this.userId = item.userId;
                this.isLoaded = true;
            });
        } else {
            this.isLoaded = true;
        }
    }

    save() {
        const companyItem = {
            ...this.companyForm.value
        };

        if (this.companyId) {
            this.store.dispatch(
                new companyActions.Update({
                    ...companyItem,
                    id: this.companyId,
                    userId: this.userId
                } as CompanyItem)
            );
        } else {
            this.store.dispatch(
                new companyActions.Add(companyItem as AddCompanyItem)
            );
        }

        this.close();
    }

    close() {
        this.isLoaded = false;
        this.modalService.dismissAll();
        this.companyForm.reset();
    }
}
