import { LoggedUser } from '../models/logged-user.model';
import { LocalizedErrorInfo } from '../shared/models/error-info.model';


export interface State {
    loggedUser: LoggedUser | null;
    error: LocalizedErrorInfo;
}

export const initialState: State = {
    loggedUser: null,
    error: null
};
