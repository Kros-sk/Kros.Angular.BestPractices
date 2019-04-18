import { AppActionsTypes, AppActions } from './app.actions';
import { initialState, State } from './app.state';


export function loginReducer(state = initialState, action: AppActions): State {
    switch (action.type) {
        case AppActionsTypes.LoginSuccess:
            return {
                ...state,
                loggedUser: action.payload
            };
        case AppActionsTypes.LoginFail:
            return {
                ...state,
                loggedUser: null,
                error: action.payload
            };
        case AppActionsTypes.LogoutSuccess:
            return {
                ...state,
                loggedUser: null
            };
        default:
            return state;
    }
}
