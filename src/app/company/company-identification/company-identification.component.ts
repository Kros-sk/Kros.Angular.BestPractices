import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validators,
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors,
    FormGroup
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
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CompanyIdentificationComponent,
            multi: true
        }
    ]
})
export class CompanyIdentificationComponent
    implements OnInit, ControlValueAccessor, Validator {
    companyIdentification: FormGroup;
    constructor(private fb: FormBuilder) {}

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.companyIdentification.status === 'VALID') {
            return null;
        }
        return { error: this.companyIdentification.status };
    }
    ngOnInit() {
        this.companyIdentification = this.fb.group({
            organizationName: ['', [Validators.required, Validators.maxLength(50)]],
            businessId: ['', [Validators.required, Validators.pattern(/^\d*$/)]]
        });
    }

    writeValue(obj: any): void {
        this.companyIdentification.patchValue({
            organizationName: obj.organizationName,
            businessId: obj.businessId
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
