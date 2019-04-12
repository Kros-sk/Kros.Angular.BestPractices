import { OnInit, Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'kros-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor(private todoService: TodoService) { }

    todoList$: Observable<Todo[]>;

    ngOnInit() {
        this.todoList$ = this.todoService.getTodoList();
    }
}
