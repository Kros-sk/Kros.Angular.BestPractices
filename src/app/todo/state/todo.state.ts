import { TodoListItem } from '../models/todo.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';


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
