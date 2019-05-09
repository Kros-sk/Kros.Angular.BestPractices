import { TodoListItem } from '../models/todo.model';
import * as fromRoot from '../../state/app.state';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


export interface State extends fromRoot.State {
    todos: TodoState;
}

export interface TodoState {
    todos: TodoListItem[];
    error: LocalizedErrorInfo | null;
    addProgres: boolean;
}

export const initialState: TodoState = {
    todos: [],
    addProgres: false,
    error: null
};
