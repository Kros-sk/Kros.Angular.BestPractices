import { CompanyItem } from '../models/company.model';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';

export interface CompanyState{
    companies: CompanyItem[],
    error: LocalizedErrorInfo | null;    
}

export const initialState: CompanyState ={
    companies: [],
    error: null
}