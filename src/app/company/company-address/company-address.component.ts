import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validators,
    NG_VALIDATORS,
    Validator,
    ValidationErrors,
    AbstractControl,
    FormGroup
} from '@angular/forms';
import { ZipCodeErrors } from './zip-code-validator';

@Component({
    selector: 'kros-company-address',
    templateUrl: './company-address.component.html',
    styleUrls: ['./company-address.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CompanyAddressComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CompanyAddressComponent,
            multi: true
        }
    ]
})
export class CompanyAddressComponent
    implements OnInit, ControlValueAccessor, Validator {
    address: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.address = this.fb.group({
            street: ['', Validators.required],
            streetNumber: ['', Validators.required],
            zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
            city: ['', Validators.required]
        });
    }

    writeValue(obj: any): void {
        this.address.patchValue({
            street: obj.street,
            streetNumber: obj.streetNumber,
            zipCode: obj.zipCode,
            city: obj.city
        });
    }
    registerOnChange(fn: any): void {
        this.address.valueChanges.subscribe(changedValue => fn(changedValue));
    }

    setTouched() {
        this.address.markAllAsTouched();
    }

    onTouched: () => void = () => {};

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.address.disable() : this.address.enable();
    }

    get addressZipCodeErrors(): ZipCodeErrors {
        return this.address.get('zipCode').errors as ZipCodeErrors;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.address.status === 'VALID') {
            return null;
        }
        return { error: this.address.status };
    }
}
