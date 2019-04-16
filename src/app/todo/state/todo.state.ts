import { Todo } from '../models/todo.model';
import * as fromRoot from '../../state/app.state';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


export interface State extends fromRoot.State {
    todos: TodoState;
}

export interface TodoState {
    todos: Todo[];
    error: LocalizedErrorInfo | null;
}

export const initialState: TodoState = {
    todos: [],
    error: null
};
