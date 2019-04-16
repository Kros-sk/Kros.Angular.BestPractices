import { Todo } from '../models/todo.model';
import * as fromRoot from '../../state/app.state';


export interface State extends fromRoot.State {
    todos: TodoState;
}

export interface TodoState {
    todos: Todo[];
    error: string;
}

export const initialState: TodoState = {
    todos: [],
    error: ''
};
