import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
    imports: [
        SharedModule,
        TodoRoutingModule,
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent
    ]
})
export class TodoModule { }
