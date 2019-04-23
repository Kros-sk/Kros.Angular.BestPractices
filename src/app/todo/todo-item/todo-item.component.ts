import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { State } from '../state/todo.state';
import * as todoActions from '../state/todo.actions';
import { EditTodoItemComponent } from '../edit-todo-item/edit-todo-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'kros-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

    constructor(
        private store: Store<State>,
        private modalService: NgbModal
    ) { }

    @Input() item: Todo;
    @Input() disabled = false;

    // TODO: this value will be inside Todo entity...
    done: FormControl = new FormControl(false);

    ngOnInit() {
    }

    deleteTodo(id: number) {
        this.store.dispatch(new todoActions.Delete(id));
    }

    openModal(id: number) {
        if (this.disabled) { return; }

        const modalRef = this.modalService.open(EditTodoItemComponent, {
            size: 'lg',
            centered: true
        });
        modalRef.componentInstance.itemId = id;
    }
}
