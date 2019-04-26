import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, DefaultValueAccessor } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../services/todo.service';

describe('TodoItemComponent', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot({
                }),
            ],
            declarations: [TodoItemComponent],
            providers: [{
                provide: TodoService
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
        component.item = {
            id: 1,
            created: '',
            lastChange: '',
            userId: 1,
            isDone: false,
            name: 'Ahoj',
            description: 'OK'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
