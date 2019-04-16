import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from './state/app.state';
import { Logout } from './state/app.actions';
import { Observable } from 'rxjs';
import { LoggedUser } from './models/logged-user.model';

@Component({
    selector: 'kros-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private store: Store<State>
    ) {

    }

    loggedUser$: Observable<LoggedUser>;
    isLoggedUser$: Observable<boolean>;

    ngOnInit(): void {

        this.isLoggedUser$ = this.store.select((state: any) => state.login.loggedUser != null);
        this.loggedUser$ = this.store.select((store: any) => store.login.loggedUser);
        // this.isLoggedUser$ = this.store.select(store => store.loggedUser != null);
    }

    login(pageName: string) {
        this.router.navigate([`${pageName}`]);
    }

    logout() {
        this.store.dispatch(new Logout());
    }
}


