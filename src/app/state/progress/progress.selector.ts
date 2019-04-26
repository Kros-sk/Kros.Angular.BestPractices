import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProgressState } from './progress.state';

const getProgressFeatureState = createFeatureSelector<ProgressState>('progress');

export const getProgressActionInProgress = createSelector(
    getProgressFeatureState,
    state => state.actionInProgress
);
