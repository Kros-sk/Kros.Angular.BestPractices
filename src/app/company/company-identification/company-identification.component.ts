import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validators
} from '@angular/forms';

@Component({
    selector: 'kros-company-identification',
    templateUrl: './company-identification.component.html',
    styleUrls: ['./company-identification.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CompanyIdentificationComponent,
            multi: true
        }
    ]
})
export class CompanyIdentificationComponent
    implements OnInit, ControlValueAccessor {
    companyIdentification = this.fb.group({
        companyName: ['', Validators.required, Validators.maxLength(50)],
        organizationId: [
            '',
            Validators.required,
            Validators.pattern('^[0-9]*$')
        ]
    });
    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    writeValue(obj: any): void {
        this.companyIdentification.patchValue({
            companyName: obj.companyName,
            organizationId: obj.organizationId
        });
    }
    registerOnChange(fn: any): void {
        this.companyIdentification.valueChanges.subscribe(fn);
    }
    onTouched: () => void = () => {};

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled
            ? this.companyIdentification.disable()
            : this.companyIdentification.enable();
    }
}
