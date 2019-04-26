import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { UserComponent } from './user/user.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

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
