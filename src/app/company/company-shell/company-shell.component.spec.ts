import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShellComponent } from './company-shell.component';

describe('CompanyShellComponent', () => {
    let component: CompanyShellComponent;
    let fixture: ComponentFixture<CompanyShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyShellComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
