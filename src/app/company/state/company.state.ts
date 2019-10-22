import { CompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export interface CompanyState {
    companies: CompanyItem[];
    currentCompanyId: number | null;
    error: LocalizedErrorInfo | null;
    showProgressLoad: boolean;
}

export const initialState: CompanyState = {
    companies: [],
    currentCompanyId: null,
    error: null,
    showProgressLoad: false
};
