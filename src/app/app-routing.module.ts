import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { GuardService } from './core/guard.service';
import { AuthService } from './core/auth.service';
import { UserGuardService } from './core/user.guard.service';

const routes: Routes = [
    {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule',
        canActivate: [GuardService]
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [UserGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                useHash: true,
                preloadingStrategy: NoPreloading
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        GuardService,
        AuthService,
        UserGuardService
    ]
})
export class AppRoutingModule { }
