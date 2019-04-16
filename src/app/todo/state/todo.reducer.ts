import { TodoActionsTypes, TodoActions } from './todo.actions';
import { initialState, TodoState } from './todo.state';


export function reducer(state = initialState, action: TodoActions): TodoState {
    switch (action.type) {
        case TodoActionsTypes.LoadSuccess:
            return {
                ...state,
                todos: action.payload,
                error: null
            };

        case TodoActionsTypes.LoadFail:
            return {
                ...state,
                todos: [],
                error: action.payload
            };
        default:
            return state;
    }
}
