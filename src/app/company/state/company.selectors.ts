import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from './company.state';

const getCompanyFeatureState = createFeatureSelector<CompanyState>('company');

export const getCompanyList = createSelector(
    getCompanyFeatureState,
    state => state.companies
);

export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);

export const getCurrentCompany = createSelector(
    getCompanyFeatureState,
    state => state.currentCompany
);

export const getCompaniesLoadProgress = createSelector(
    getCompanyFeatureState,
    state => state.showProgressLoad
);
