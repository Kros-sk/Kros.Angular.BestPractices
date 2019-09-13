import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBankAccountComponent } from './company-bank-account.component';

describe('CompanyBankAccountComponent', () => {
  let component: CompanyBankAccountComponent;
  let fixture: ComponentFixture<CompanyBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
