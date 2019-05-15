import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { GuardService } from './auth/service/guard.service';
import { UserGuardService } from './auth/service/user.guard.service';
import { AuthService } from './auth/service/auth.service';


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
                useHash: false,
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
