import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyItemComponent } from './edit-company-item.component';

describe('EditCompanyItemComponent', () => {
  let component: EditCompanyItemComponent;
  let fixture: ComponentFixture<EditCompanyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
