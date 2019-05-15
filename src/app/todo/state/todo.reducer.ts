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

        case TodoActionsTypes.AddFail:
            return {
                ...state,
                error: action.payload
            };

        case TodoActionsTypes.DeleteFail:
            return {
                ...state,
                error: action.payload
            };

        case TodoActionsTypes.DeleteCompletedFail:
            return {
                ...state,
                error: action.payload
            };

        case TodoActionsTypes.UpdateSuccess:
            return {
                ...state,
                todos: state.todos.map(x => x.id === action.payload.id
                    ? { ...action.payload, progress: false }
                    : x),
                error: null
            };

        case TodoActionsTypes.UpdateFail:
            return {
                ...state,
                error: action.payload
            };

        case TodoActionsTypes.SetProgressItem:
            return {
                ...state,
                todos: state.todos.map(x => x.id === action.payload
                    ? { ...x, progress: true }
                    : x)
            };

        case TodoActionsTypes.SetProgressFormAdd:
            return {
                ...state,
                addProgres: action.payload
            };
        default:
            return state;
    }
}
