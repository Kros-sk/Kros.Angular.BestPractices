import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoItemComponent } from './edit-todo-item.component';

describe('EditTodoItemComponent', () => {
  let component: EditTodoItemComponent;
  let fixture: ComponentFixture<EditTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
