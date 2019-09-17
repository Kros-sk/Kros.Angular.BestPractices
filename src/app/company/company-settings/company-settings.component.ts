import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyState } from '../state/company.state';
import * as companyActions from 'src/app/company/state/company.actions';
import { Store, select } from '@ngrx/store';
import { CompanyItem } from '../models/company.model';
import * as fromCompany from '../state/company.selectors';
import { CompanyService } from '../services/company.service';
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
        let editedCompany: CompanyItem;
        this.store
            .pipe(select(fromCompany.getCompanyList))
            .subscribe(
                companies =>
                    (editedCompany = companies.find(
                        company => this.companyId === company.id
                    ))
            );

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

        if (this.companyDetails.valid) {
            this.store.dispatch(
                new companyActions.Update(companyItem as CompanyItem)
            );
        }
    }
}
