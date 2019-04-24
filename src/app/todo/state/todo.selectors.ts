import { TodoState } from './todo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


const getTodoFeatureState = createFeatureSelector<TodoState>('todos');

export const getTodoList = createSelector(
    getTodoFeatureState,
    state => state.todos
);

export const getError = createSelector(
    getTodoFeatureState,
    state => state.error
);

export const getTodoActionInProgress = createSelector(
    getTodoFeatureState,
    state => state.actionInProgress
);
