import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { GuardService } from './core/guard.service';
import { CallBackComponent } from './call-back/call-back.component';
import { AuthService } from './core/auth.service';

const routes: Routes = [
    {
        path: 'auth-callback',
        component: CallBackComponent,
    },
    {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule',
        canActivate: [GuardService]
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [GuardService]
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
    providers: [GuardService, AuthService]
})
export class AppRoutingModule { }
