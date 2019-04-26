import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo.effects';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';


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
