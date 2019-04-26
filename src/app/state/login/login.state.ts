import { LoggedUser } from 'src/app/models/logged-user.model';

export interface LoginState {
    loggedUser: LoggedUser | null;
}

export const initialState: LoginState = {
    loggedUser: null,
};
