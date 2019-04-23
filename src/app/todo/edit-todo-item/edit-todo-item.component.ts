import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { State } from '../state/todo.state';
import { Store } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { TodoService } from '../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kros-edit-todo-item',
    templateUrl: './edit-todo-item.component.html',
    styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private todoService: TodoService,
        private modalService: NgbModal,
        private store: Store<State>
    ) { }

    todoForm: FormGroup;

    @Input() itemId: number;

    ngOnInit() {
        this.todoForm = this.formBuilder.group({
            name: '',
            description: ''
        });
        this.todoService.getTodo(this.itemId).subscribe(item => {
            this.todoForm.patchValue({
                name: item.name,
                description: item.description
            });
        });
    }

    save() {
        this.store.dispatch(new todoActions.Update({
            id: this.itemId,
            name: this.todoForm.value.name,
            description: this.todoForm.value.description
        }));
        this.modalService.dismissAll();
    }

    close() {
        this.modalService.dismissAll();
    }
}
