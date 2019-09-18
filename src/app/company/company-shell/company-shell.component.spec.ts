import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShellComponent } from './company-shell.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyShellComponent', () => {
    let component: CompanyShellComponent;
    let fixture: ComponentFixture<CompanyShellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
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
