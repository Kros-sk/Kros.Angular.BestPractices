import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validators
} from '@angular/forms';

@Component({
    selector: 'kros-company-address',
    templateUrl: './company-address.component.html',
    styleUrls: ['./company-address.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CompanyAddressComponent,
            multi: true
        }
    ]
})
export class CompanyAddressComponent implements OnInit, ControlValueAccessor {
    address = this.fb.group({
        street: ['', Validators.required],
        streetNumber: [''],
        zipCode: [''],
        city: ['']
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

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

    onTouched: () => void = () => {};

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.address.disable() : this.address.enable();
    }
}
