import { OnInit, Component } from '@angular/core';
import { Todo, TodoListFilter } from '../models/todo.model';
import { Store,  select} from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { Observable } from 'rxjs';
import { State } from '../state/todo.state';
import { getTodoList , getError} from '../state/todo.selectors';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { FormControl } from '@angular/forms';

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

    errorMessage$: Observable<LocalizedErrorInfo | null>;
    todoList$: Observable<Todo[]>;
    selectedFilterControl: FormControl;

    ngOnInit() {
        this.selectedFilterControl = new FormControl(TodoListFilter.All);
        this.todoList$ = this.store.pipe(select(getTodoList));
        this.errorMessage$ = this.store.pipe(select(getError));
        this.store.dispatch(new todoActions.Load());
    }
}
