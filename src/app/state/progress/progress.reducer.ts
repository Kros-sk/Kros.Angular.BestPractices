import { ProgressActionsTypes, ProgressActions } from './progress.actions';
import { initialState, ProgressState } from './progress.state';


export function progressReducer(state = initialState, action: ProgressActions): ProgressState {
    switch (action.type) {
        case ProgressActionsTypes.SetActionInProgress:
            return {
                ...state,
                actionInProgress: action.payload
            };

        default:
            return state;
    }
}
