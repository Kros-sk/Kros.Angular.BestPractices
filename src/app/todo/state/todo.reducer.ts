import { Todo } from '../models/todo.model';
import { TodoActionsTypes, TodoActions} from './todo.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    todos: TodoState;
  }

export interface TodoState {
    todos: Todo[];
    error: string;
}

const initialState: TodoState = {
    todos: [],
    error: ''
};


const getTodoState = createFeatureSelector<TodoState>('todos');

export const getTodoList = createSelector(
    getTodoState,
  state => {
    return state.todos;
  }
);

export function reducer(state = initialState, action: TodoActions): TodoState {
    switch (action.type) {

        case TodoActionsTypes.LoadSuccess:
            return {
                ...state,
                todos: action.payload,
                error: ''
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
