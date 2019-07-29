import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyItemComponent } from './add-company-item.component';

describe('AddCompanyItemComponent', () => {
  let component: AddCompanyItemComponent;
  let fixture: ComponentFixture<AddCompanyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
