import { LoginActionsTypes, LoginActions } from './login.actions';
import { initialState, LoginState } from './login.state';

export function loginReducer(state = initialState, action: LoginActions): LoginState {
    switch (action.type) {
        case LoginActionsTypes.LoginSuccess:
            return {
                ...state,
                loggedUser: action.payload
            };
        case LoginActionsTypes.LogoutSuccess:
            return {
                ...state,
                loggedUser: null
            };
        default:
            return state;
    }
}
