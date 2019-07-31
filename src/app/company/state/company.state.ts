import { CompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export interface CompanyState {
    companies: CompanyItem[];
    currentCompany: CompanyItem | null;
    error: LocalizedErrorInfo | null;
}

export const initialState: CompanyState = {
    companies: [],
    currentCompany: null,
    error: null
};
