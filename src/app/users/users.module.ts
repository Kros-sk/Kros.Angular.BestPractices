import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer } from './state/user.reducer';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserEffects } from './state/user.effects';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        SharedModule,
        UsersRoutingModule,
        StoreModule.forFeature('users', reducer),
        EffectsModule.forFeature(
            [UserEffects]
        )
    ],
    declarations: [
        UsersListComponent,
        UserComponent
    ]
})
export class UsersModule { }
