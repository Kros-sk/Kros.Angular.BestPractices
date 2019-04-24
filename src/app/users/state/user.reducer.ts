import { UserActions, UserActionTypes } from './user.actions';
import { initialState, UserState } from './users.state';


export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoadSuccess:
            return {
                ...state,
                actionInProgress: false,
                users: action.payload,
                error: null
            };

        case UserActionTypes.LoadFail:
            return {
                ...state,
                users: [],
                actionInProgress: false,
                error: action.payload
            };
    default:
      return state;
  }
}
