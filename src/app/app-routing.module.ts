import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

import { GuardService } from './auth/service/guard.service';
import { UserGuardService } from './auth/service/user.guard.service';
import { LoggedInCompanyGuardServiceService } from './auth/service/logged.in.company.guard.service';


const routes: Routes = [
    {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
        canActivate: [LoggedInCompanyGuardServiceService]
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [UserGuardService]
    },
    {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
        canActivate: [GuardService]
    },
    {
        path: '**',
        redirectTo: '/company',
        pathMatch: 'full'
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
