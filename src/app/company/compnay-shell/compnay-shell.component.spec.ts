import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnayShellComponent } from './compnay-shell.component';

describe('CompnayShellComponent', () => {
  let component: CompnayShellComponent;
  let fixture: ComponentFixture<CompnayShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompnayShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompnayShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
