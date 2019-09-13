import { Component, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'kros-company-bank-account',
    templateUrl: './company-bank-account.component.html',
    styleUrls: ['./company-bank-account.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CompanyBankAccountComponent,
            multi: true
        }
    ]
})
export class CompanyBankAccountComponent
    implements OnInit, ControlValueAccessor {
    primaryBankAccount = this.fb.group({
        iban: '',
        name: ''
    });
    // secondaryBankAccount = this.fb.group({
    //     iban: '',
    //     name: ''
    // });
    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    writeValue(obj: any): void {
        this.primaryBankAccount.patchValue({
            iban: obj.iban,
            name: obj.name
        });
        // this.secondaryBankAccount.patchValue({
        //     iban: obj.iban,
        //     name: obj.name
        // });
    }
    registerOnChange(fn: any): void {
        this.primaryBankAccount.valueChanges.subscribe(fn);
    }
    onTouched: () => void = () => {};

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled
            ? this.primaryBankAccount.disable()
            : this.primaryBankAccount.enable();
    }
}
