import { UserState } from './users.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


const getUsersFeatureState = createFeatureSelector<UserState>('users');

export const getAllUsers = createSelector(
    getUsersFeatureState,
    state => state.users
);

export const getError = createSelector(
    getUsersFeatureState,
    state => state.error
);
