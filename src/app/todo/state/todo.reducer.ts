import { TodoActionsTypes, TodoActions } from './todo.actions';
import { initialState, TodoState } from './todo.state';


export function reducer(state = initialState, action: TodoActions): TodoState {
    switch (action.type) {
        case TodoActionsTypes.LoadSuccess:
            return {
                ...state,
                actionInProgress: false,
                todos: action.payload,
                error: null
            };

        case TodoActionsTypes.LoadFail:
            return {
                ...state,
                todos: [],
                actionInProgress: false,
                error: action.payload
            };


        case TodoActionsTypes.AddFail:
            return {
                ...state,
                actionInProgress: false,
                error: action.payload
            };

        case TodoActionsTypes.DeleteFail:
            return {
                ...state,
                actionInProgress: false,
                error: action.payload
            };

        case TodoActionsTypes.UpdateFail:
            return {
                ...state,
                actionInProgress: false,
                error: action.payload
            };

        case TodoActionsTypes.SetActionInProgress:
            return {
                ...state,
                actionInProgress: action.payload
            };
        default:
            return state;
    }
}
