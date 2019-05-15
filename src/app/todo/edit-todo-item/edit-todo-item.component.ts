import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { TodoService } from '../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoState } from '../state/todo.state';

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
        private store: Store<TodoState>
    ) { }
    progress: boolean;
    todoForm: FormGroup;

    @Input() itemId: number;

    ngOnInit() {
        this.progress = false;
        this.todoForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.todoService.getTodo(this.itemId).subscribe(item => {
            this.todoForm.patchValue({
                name: item.name,
                description: item.description
            });
            this.progress = true;
        });
    }

    save() {
        this.store.dispatch(new todoActions.Update({
            id: this.itemId,
            name: this.todoForm.value.name,
            description: this.todoForm.value.description,
            isDone: false
        }));
        this.modalService.dismissAll();
    }

    close() {
        this.modalService.dismissAll();
    }
}
