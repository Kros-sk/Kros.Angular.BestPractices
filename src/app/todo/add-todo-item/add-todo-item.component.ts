import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../state/todo.state';
import * as todoActions from '../state/todo.actions';


@Component({
    selector: 'kros-add-todo-item',
    templateUrl: './add-todo-item.component.html',
    styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<State>
    ) { }

    @Input() disabled = false;

    todoForm: FormGroup;

    ngOnInit() {
        this.todoForm = this.formBuilder.group({
            name: '',
            description: ''
        });
    }

    addTodo() {
        this.store.dispatch(new todoActions.Add({
            name: this.todoForm.value.name,
            description: this.todoForm.value.description
        }));
    }
}
