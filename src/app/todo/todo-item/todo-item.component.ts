import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { Store, select } from '@ngrx/store';
import { State } from '../state/todo.state';
import * as todoActions from '../state/todo.actions';
import { EditTodoItemComponent } from '../edit-todo-item/edit-todo-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';


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

    @Input() item: TodoItem;

    isDoneControl: FormControl;

    ngOnInit() {
        this.isDoneControl = new FormControl(this.item.isDone);
        this.isDoneControl.valueChanges.pipe(
            debounceTime(200)
        ).subscribe(
            (newValue: boolean) => this.setTodoState(this.item.id, newValue)
        );
    }

    deleteTodo(id: number) {
        this.store.dispatch(new todoActions.Delete(id));
    }

    editTodo(id: number) {
        const modalRef = this.modalService.open(EditTodoItemComponent, {
            size: 'lg',
            centered: true
        });
        modalRef.componentInstance.itemId = id;
    }

    setTodoState(id: number, isDone: boolean) {
        this.store.dispatch(
            new todoActions.SetState({ id, isDone })
        );
    }
}
