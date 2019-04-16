import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule,
        StoreModule.forFeature('users', reducer)
    ],
    declarations: [
        UsersListComponent
    ]
})
export class UsersModule { }
