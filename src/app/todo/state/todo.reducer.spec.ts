import { reducer } from './todo.reducer';
import * as todoActions from './todo.actions';
import { TodoListItem, NewTodoItem } from '../models/todo.model';
import { TodoState } from './todo.state';


describe('Todo Reducer and Action', () => {
    const todoList: TodoListItem[] = [
        {
            id: 1,
            isDone: false,
            name: 'TODODODODODo',
            progress: true
        }
    ];
    const todo: NewTodoItem =
    {
        description: 'Create',
        name: 'New todo'
    };
    const initialState: TodoState = {
        todos: [],
        addProgres: false,
        error: null
    };
    it('should mutate state correctly with Load Success Action', () => {
        const action = new todoActions.LoadSuccess(todoList);
        const result = reducer(initialState, action);

        expect(result).toEqual({
            ...initialState,
            todos: todoList,
            error: null,
        });

    });

    it('should mutate state correctly with Add Success Action', () => {
        const action = new todoActions.AddSuccess();
        const result = reducer(initialState, action);

        expect(result).toEqual({
            ...initialState,
            // todos: todoList,
            error: null,
        });

    });

    it('should mutate state correctly with SetProgressFormAdd Action', () => {
        const action = new todoActions.SetProgressFormAdd(false);
        const result = reducer(initialState, action);

        expect(result).toEqual({
            ...initialState,
            addProgres: false
        });

    });
});
