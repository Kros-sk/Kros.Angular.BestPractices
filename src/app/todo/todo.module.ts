import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { reducer } from './state/todo.reducer';
import { SharedModule } from '../shared/shared.module';
import { TodoEffects } from './state/todo.effects';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';


@NgModule({
    imports: [
        SharedModule,
        TodoRoutingModule,
        StoreModule.forFeature('todos', reducer),
        EffectsModule.forFeature(
            [TodoEffects]
        )
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        AddTodoItemComponent,
        EditTodoItemComponent
    ],
    entryComponents: [EditTodoItemComponent],
    exports: [EditTodoItemComponent]
})
export class TodoModule { }
