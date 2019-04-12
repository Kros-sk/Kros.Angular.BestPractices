import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
    selector: 'kros-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

    constructor() { }

    @Input() item: Todo;

    ngOnInit() {
    }

}
