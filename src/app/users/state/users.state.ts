import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { User } from '../models/user.model';


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
