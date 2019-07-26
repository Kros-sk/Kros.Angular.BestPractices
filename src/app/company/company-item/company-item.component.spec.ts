import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyItemComponent } from './company-item.component';

describe('CompanyItemComponent', () => {
  let component: CompanyItemComponent;
  let fixture: ComponentFixture<CompanyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
