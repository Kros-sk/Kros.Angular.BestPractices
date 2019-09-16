import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddressComponent } from './company-address.component';

xdescribe('CompanyAddressComponent', () => {
    let component: CompanyAddressComponent;
    let fixture: ComponentFixture<CompanyAddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyAddressComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
