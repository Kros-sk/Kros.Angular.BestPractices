import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggedUser } from './models/logged-user.model';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { AuthService } from './auth/service/auth.service';
import { Logout } from './auth/state/login.actions';

import { CompanyItem } from './company/models/company.model';
import { getCurrentCompany } from './company/state/company.selectors';
import * as companyActions from './company/state/company.actions';


@Component({
    selector: 'kros-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('animationKros', [
            transition('left <=> right', animate('4000ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-1750%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(0%)', offset: 1 }),
            ])))
        ])
    ]
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        public authService: AuthService,
        private store: Store<any>,
    ) { }

    actionInProgress = false;
    loggedUser$: Observable<LoggedUser>;
    isLoggedUser$: Observable<boolean>;
    currentCompany$: Observable<CompanyItem>;
    state = 'left';

    seconds = 0;

    ngOnInit(): void {
        this.isLoggedUser$ = this.store.select((store: any) => store.login.loggedUser != null);
        this.loggedUser$ = this.store.select((store: any) => store.login.loggedUser);
        this.currentCompany$ = this.store.select(getCurrentCompany);

        this.store.dispatch(new companyActions.LoadOnStart());
    }

    login(pageName: string) {
        this.router.navigate([`${pageName}`]);
    }

    logout() {
        this.store.dispatch(new Logout());
    }

    animateMe() {
        this.state = (this.state === 'left' ? 'right' : 'left');
    }

    buttonClick() {
        this.actionInProgress = true;
        setTimeout(() => {
            this.actionInProgress = false;
            console.log(this.actionInProgress);
        }, 1000);
    }
}
