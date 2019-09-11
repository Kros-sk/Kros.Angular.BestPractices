import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySettingsComponent } from './company-settings.component';

describe('CompanySettingsComponent', () => {
  let component: CompanySettingsComponent;
  let fixture: ComponentFixture<CompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
