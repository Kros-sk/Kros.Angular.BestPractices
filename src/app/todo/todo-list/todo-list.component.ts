import { OnInit, Component } from '@angular/core';
import { TodoListFilter, TodoListItem } from '../models/todo.model';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';
import { Observable } from 'rxjs';
import { State } from '../state/todo.state';
import { getTodoList, getError } from '../state/todo.selectors';
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
    displayList: TodoListItem[];
    selectedFilterControl: FormControl;

    ngOnInit() {
        this.selectedFilterControl = new FormControl(TodoListFilter.All);
        this.errorMessage$ = this.store.pipe(select(getError));
        this.store.dispatch(new todoActions.Load());
        this.store.pipe(select(getTodoList)).subscribe(
            (todoListItems: TodoListItem[]) => this.filterItem(todoListItems)
        );
    }

    deleteComplete() {
        this.store.dispatch(new todoActions.DeleteCompleted());
    }

    setFilter() {
        this.store.dispatch(new todoActions.SetFilter());
    }

    filterItem(allItems: TodoListItem[]) {
        if (this.selectedFilterControl.value === TodoListFilter.Active) {
            this.displayList = [...allItems.filter(x => !x.isDone)];
        } else if (this.selectedFilterControl.value === TodoListFilter.Completed) {
            this.displayList = [...allItems.filter(x => x.isDone)];
        } else {
            this.displayList = [...allItems];
        }
    }
}
