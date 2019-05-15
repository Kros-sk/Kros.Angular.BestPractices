import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { Observable } from 'rxjs';
import { getProgressFormADD } from '../state/todo.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { TodoState } from '../state/todo.state';


@Component({
    selector: 'kros-add-todo-item',
    templateUrl: './add-todo-item.component.html',
    styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<TodoState>,
        private actions$: Actions
    ) { }

    todoForm: FormGroup;
    progress$: Observable<boolean>;

    ngOnInit() {
        this.todoForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.progress$ = this.store.pipe(select(getProgressFormADD));
        this.actions$.pipe(
            ofType(todoActions.TodoActionsTypes.AddSuccess)
        ).subscribe(
            () => this.todoForm.reset()
        );
    }

    addTodo() {
        this.store.dispatch(new todoActions.Add({
            name: this.todoForm.value.name,
            description: this.todoForm.value.description
        }));
    }
}
