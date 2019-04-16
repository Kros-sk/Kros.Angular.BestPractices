import { OnInit, Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store,  select} from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { Observable } from 'rxjs';
import { State } from '../state/todo.state';
import { getTodoList } from '../state/todo.selectors';

@Component({
    selector: 'kros-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor(
        private store: Store<State>
    ) {
    }

    todoList$: Observable<Todo[]>;

    ngOnInit() {
        this.store.dispatch(new todoActions.Load());

        this.todoList$ = this.store.pipe(select(getTodoList));
    }
}
