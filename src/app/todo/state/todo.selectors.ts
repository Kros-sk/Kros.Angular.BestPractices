import { TodoState } from './todo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


const getTodoFeatureState = createFeatureSelector<TodoState>('todos');

export const getTodoList = createSelector(
    getTodoFeatureState,
    state => state.todos
);
