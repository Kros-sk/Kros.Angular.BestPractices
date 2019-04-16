import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo.efects';


@NgModule({
    imports: [
        SharedModule,
        TodoRoutingModule,
        StoreModule.forFeature('todos', reducer),
        EffectsModule.forFeature(
            [ TodoEffects ]
        )
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent
    ]
})
export class TodoModule { }
