import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './users-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersListComponent
    ]
})
export class UsersModule { }
