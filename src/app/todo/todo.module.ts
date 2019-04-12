import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
    imports: [
        SharedModule,
        TodoRoutingModule
    ],
    declarations: [
        TodoListComponent
    ]
})
export class TodoModule { }
