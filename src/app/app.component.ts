import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from './state/app.state';
import { Observable } from 'rxjs';
import { LoggedUser } from './models/logged-user.model';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { getProgressActionInProgress } from './state/progress/progress.selector';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from './auth/service/auth.service';
import { Logout } from './auth/state/login.actions';
import { ButtonComponent } from './shared/button/button.component';


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
        private store: Store<State>
    ) {
    }


    actionInProgress = false;
    loggedUser$: Observable<LoggedUser>;
    isLoggedUser$: Observable<boolean>;
    state = 'left';

    ngOnInit(): void {
        this.isLoggedUser$ = this.store.select((store: any) => store.login.loggedUser != null);
        this.loggedUser$ = this.store.select((store: any) => store.login.loggedUser);
        // this.actionInProgress$ = this.store.pipe(
        //     select(getProgressActionInProgress),
        //     debounceTime(200) // TODO vyskumat... preco hadze ExpressionChangedAfterItHasBeenCheckedError bez tohto debounce
        // );
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


