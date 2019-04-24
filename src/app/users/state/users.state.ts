import * as fromRoot from '../../state/app.state';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { User } from '../models/user.model';

export interface StateUser extends fromRoot.State {
    users: UserState;
}

export interface UserState {
    actionInProgress: boolean;
    users: User[];
    error: LocalizedErrorInfo | null;
}

export const initialState: UserState = {
    actionInProgress: false,
    users: [],
    error: null
};
