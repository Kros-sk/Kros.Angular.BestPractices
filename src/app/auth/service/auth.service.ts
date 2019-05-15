import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import * as Oidc from 'oidc-client';
import { LoggedUser } from '../models/logged-user.model';
import { Store } from '@ngrx/store';
import { State } from '../state/login.state';
import { LoginSuccess } from '../state/login.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private manager = null;
    private user: User = null;
    public isAdmin = false;

    constructor(
        private store: Store<State>,
        private http: HttpClient
    ) {
        this.manager = new UserManager(getClientSettings());

        this.manager.getUser().then(user => {
            this.user = user;
            if (this.user) {
                this.loadUserInfo();
                this.store.dispatch(new LoginSuccess(this.getLoggedUser()));
            }
        });

        this.manager.events.addUserLoaded(args => {
            this.manager.getUser().then(user => {
                this.user = user;
                if (this.user) {
                    this.loadUserInfo();
                    this.store.dispatch(new LoginSuccess(this.getLoggedUser()));
                }
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
        return this.manager.signinPopup();
    }

    getAccessToken(): string {
        return this.user ? this.user.access_token : '';
    }

    logOut(): Promise<void> {
        return this.manager.signoutRedirect();
    }

    loadUserInfo() {
        this.http
            .get(`${environment.usersApiUrl}/api/Users/IsAdmin`)
            .subscribe(resp => {
                if (resp) {
                    this.isAdmin = (resp as boolean);
                }
            });
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
        popupWindowFeatures: 'location=no,toolbar=yes,width=800,height=600,left=100,top=100',
        authority: 'https://demo.identityserver.io/',
        client_id: 'spa',
        redirect_uri: `${environment.identityServerCallBackUri}/assets/login-redirect.html`,
        post_logout_redirect_uri: `${environment.identityServerCallBackUri}`,
        response_type: 'code',
        scope: 'openid profile email api',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: `${environment.identityServerCallBackUri}/assets/silent-refresh.html`,
    };
}
