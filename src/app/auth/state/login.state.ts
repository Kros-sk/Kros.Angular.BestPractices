import { LoggedUser } from '../models/logged-user.model';

export interface State {
    login: LoginState;
}

export interface LoginState {
    loggedUser: LoggedUser | null;
}

export const initialState: LoginState = {
    loggedUser: null,
};
