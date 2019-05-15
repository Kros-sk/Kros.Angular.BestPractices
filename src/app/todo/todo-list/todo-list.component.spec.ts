import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTodoItemComponent } from '../add-todo-item/add-todo-item.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { StoreModule, Store } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { reducer } from '../state/todo.reducer';
import { EffectsModule } from '@ngrx/effects';



describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                ReactiveFormsModule,
                FormsModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot({}),
                StoreModule.forFeature('todos', reducer),
            ],
            declarations: [
                TodoListComponent,
                AddTodoItemComponent,
                TodoItemComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
