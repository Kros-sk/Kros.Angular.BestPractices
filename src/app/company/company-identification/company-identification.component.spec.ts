import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyIdentificationComponent } from './company-identification.component';

describe('CompanyIdentificationComponent', () => {
  let component: CompanyIdentificationComponent;
  let fixture: ComponentFixture<CompanyIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
