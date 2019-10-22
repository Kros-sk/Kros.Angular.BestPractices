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

export const getCurrentCompanyId = createSelector(
    getCompanyFeatureState,
    state => state.currentCompanyId
);

export const getCurrentCompany = createSelector(
    getCompanyList,
    getCurrentCompanyId,
    (companies, id) => companies.find(company => id === company.id)
);

export const getCompaniesLoadProgress = createSelector(
    getCompanyFeatureState,
    state => state.showProgressLoad
);
