import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoItemComponent } from './add-todo-item.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { reducer } from '../state/todo.reducer';

describe('AddTodoItemComponent', () => {
    let component: AddTodoItemComponent;
    let fixture: ComponentFixture<AddTodoItemComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                ReactiveFormsModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot({}),
                StoreModule.forFeature('todos', reducer)
            ],
            declarations: [AddTodoItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTodoItemComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onClick method', fakeAsync( () => {
        // const onClickMock = spyOn(component, 'addTodo');
        // fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
        // expect(onClickMock).toHaveBeenCalled();

        component.todoForm.get('name').setValue('Todo');
        component.todoForm.get('description').setValue('Description');

        fixture.detectChanges();
        spyOn(component, 'addTodo');
        const btn = fixture.debugElement.query(By.css('button'));

        // btn.triggerEventHandler('click', null);
        btn.nativeElement.click();

        tick();
        fixture.detectChanges();
        expect(component.addTodo).toHaveBeenCalled();
    }));

    fit('should disable add button when inputs are empty', () => {
        component.todoForm.get('name').setValue('');
        component.todoForm.get('description').setValue('');
        expect(component.todoForm.valid).toBeFalsy();
        expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();
    });
});
