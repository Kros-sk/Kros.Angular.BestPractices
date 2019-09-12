import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
    selector: "kros-company-settings",
    templateUrl: "./company-settings.component.html",
    styleUrls: ["./company-settings.component.scss"]
})
export class CompanySettingsComponent implements OnInit {
    companyDetails = this.fb.group({
        companyName: [""],
        organizationId: [""],
        address: {
            street: "",
            streetNumber: "",
            zipCode: "",
            city: ""
        }
    });
    companyBankAccounts = this.fb.group({
        primaryBankAccount: this.fb.group({
            iban: [""],
            name: [""]
        }),
        secondaryBankAccount: this.fb.group({
            iban: [""],
            name: [""]
        })
    });

    companyDetailVisible: boolean;
    bankAccountsVisible: boolean;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.showCompanyDetails();
    }

    showCompanyDetails() {
        this.companyDetailVisible = true;
        this.bankAccountsVisible = false;
    }
    showBankAccounts() {
        this.bankAccountsVisible = true;
        this.companyDetailVisible = false;
    }
    save() {}
}
