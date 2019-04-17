import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import * as Oidc from 'oidc-client';
import { LoggedUser } from '../models/logged-user.model';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { LoginSuccess } from '../state/app.actions';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private manager = null;
    private user: User = null;
    constructor(private store: Store<State>
    ) {
        this.manager = new UserManager(getClientSettings());

        this.manager.getUser().then(user => {
            this.user = user;
            if (this.user) {
                this.store.dispatch(new LoginSuccess(this.getLoggedUser()));
            }
        });

        this.manager.events.addUserLoaded(args => {
            this.manager.getUser().then(user => {
                this.user = user;
            });
        });
    }

    isLoggedIn(): boolean {
        return this.user != null && !this.user.expired;
    }

    getLoggedUser(): LoggedUser {
        return { name: this.user.profile.name, email: this.user.profile.email };
    }

    getClaims(): any {
        return this.user.profile;
    }

    getAuthorizationHeaderValue(): string {
        return `${this.user.token_type} ${this.user.access_token}`;
    }

    startAuthentication(): Promise<void> {
        return this.manager.signinRedirect();
    }

    getAccessToken(): string {
        return this.user ? this.user.access_token : '';
    }

    logOut(): Promise<void> {
        return this.manager.signoutRedirect();
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
        authority: 'https://demo.identityserver.io/',
        client_id: 'spa',
        redirect_uri: 'http://localhost:4200/assets/login-redirect.html',
        post_logout_redirect_uri: 'http://localhost:4200',
        response_type: 'code',
        scope: 'openid profile email',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: 'http://localhost:4200/assets/silent-refresh.html',
    };
}
