import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { CompanyState } from '../state/company.state';
import * as companyActions from 'src/app/company/state/company.actions';
import { CompanyItem } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { CompanyAddressComponent } from '../company-address/company-address.component';
@Component({
    selector: 'kros-company-settings',
    templateUrl: './company-settings.component.html',
    styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
    companyDetails: FormGroup;
    companyBankAccounts: FormGroup;

    companyDetailVisible: boolean;
    bankAccountsVisible: boolean;
    companyId;

    @ViewChild(CompanyAddressComponent, { static: false })
    companyAddress;
    writeValue(obj: any): void {}

    constructor(
        private fb: FormBuilder,
        private store: Store<CompanyState>,
        private route: ActivatedRoute,
        private companyService: CompanyService
    ) {}

    ngOnInit() {
        this.showCompanyDetails();
        this.companyDetails = this.fb.group({
            companyIdentification: {
                companyName: '',
                businessId: ''
            },
            address: {
                street: '',
                streetNumber: '',
                zipCode: '',
                city: ''
            }
        });
        this.companyBankAccounts = this.fb.group({
            primaryBankAccount: {
                name: '',
                iban: ''
            }
        });
        this.companyId = +this.route.snapshot.paramMap.get('id');

        this.companyService.getCompany(this.companyId).subscribe(item => {
            if (this.companyId) {
                this.companyDetails.get('companyIdentification').patchValue({
                    companyName: item.companyName,
                    businessId: item.businessId
                });
                this.companyDetails.get('address').patchValue({
                    street: item.street,
                    streetNumber: item.streetNumber,
                    zipCode: item.zipCode,
                    city: item.city
                });
            }
        });
    }

    showCompanyDetails() {
        this.companyDetailVisible = true;
        this.bankAccountsVisible = false;
    }
    showBankAccounts() {
        this.bankAccountsVisible = true;
        this.companyDetailVisible = false;
    }
    save() {
        const companyItem = {
            ...this.companyDetails.get('companyIdentification').value,
            ...this.companyDetails.get('address').value,
            id: this.companyId
        };
        this.companyAddress.setTouched();
        if (this.companyDetails.valid) {
            this.store.dispatch(
                new companyActions.Update(companyItem as CompanyItem)
            );
        }
    }
}
