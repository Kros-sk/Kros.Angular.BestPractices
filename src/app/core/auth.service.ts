import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import * as Oidc from 'oidc-client';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private manager = null;
    private user: User = null;

    constructor() {
        this.manager = new UserManager(getClientSettings());

        this.manager.getUser().then(user => {
            this.user = user;
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

    completeAuthentication(): Promise<void> {
        return this.manager.signinRedirectCallback().then(user => {
            this.user = user;
        });
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
        authority: 'https://demo.identityserver.io/',
        client_id: 'spa',
        redirect_uri: 'http://localhost:4200/auth-callback',
        post_logout_redirect_uri: 'http://localhost:4200',
        response_type: 'code',
        scope: 'openid',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: 'http://localhost:4200/assets/silent-refresh.html',
    };
}
