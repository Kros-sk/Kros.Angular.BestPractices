import { OnInit, Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store,  select} from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { TodoState, State } from '../state/todo.reducer';

@Component({
    selector: 'kros-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor(
        private store: Store<State>) { }

    todoList: Todo[] = [];

    ngOnInit() {
        this.store.dispatch(new todoActions.Load());
        this.store.pipe(select(state => state.todos)).subscribe(
            (x: TodoState) => {
                console.log('--------',x);
                this.todoList = x.todos;
            });
    }
}
