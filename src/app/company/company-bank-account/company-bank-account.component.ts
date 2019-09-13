import { Component, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    NG_VALUE_ACCESSOR,
    Validators,
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors
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
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CompanyBankAccountComponent,
            multi: true
        }
    ]
})
export class CompanyBankAccountComponent
    implements OnInit, ControlValueAccessor, Validator {
    primaryBankAccount = this.fb.group({
        iban: ['', Validators.required],
        name: ['', Validators.required]
    });

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.primaryBankAccount.status === 'VALID') {
            return null;
        }
        return { error: this.primaryBankAccount.status };
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    writeValue(obj: any): void {
        this.primaryBankAccount.patchValue({
            iban: obj.iban,
            name: obj.name
        });
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
