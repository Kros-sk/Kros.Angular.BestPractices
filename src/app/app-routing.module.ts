import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

import { GuardService } from './auth/service/guard.service';
import { UserGuardService } from './auth/service/user.guard.service';


const routes: Routes = [
    {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
        canActivate: [GuardService]
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
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
    ]
})
export class AppRoutingModule { }
