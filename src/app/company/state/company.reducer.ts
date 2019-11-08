import { initialState, CompanyState } from './company.state';
import { CompanyActionsTypes, CompanyActions } from './company.actions';

export function companyReducer(state = initialState, action: CompanyActions): CompanyState {
    switch (action.type) {
        case CompanyActionsTypes.LoadSuccess:
        case CompanyActionsTypes.LoadOnStartSuccess:
            return {
                ...state,
                companies: action.payload,
                error: null
            };

        case CompanyActionsTypes.LoadFail:
            return {
                ...state,
                companies: [],
                currentCompanyId: null,
                error: action.payload
            };

        case CompanyActionsTypes.AddSuccess:
            return {
                ...state,
                companies: [...state.companies, action.payload]
            };

        case CompanyActionsTypes.SetCurrentCompany:
            return {
                ...state,
                currentCompanyId: action.payload,
                error: null
            };

        case CompanyActionsTypes.StartProgress:
            return {
                ...state,
                showProgressLoad: true
            };

        case CompanyActionsTypes.StopProgress:
            return {
                ...state,
                showProgressLoad: false
            };

        case CompanyActionsTypes.SetFirstCompany:
            return {
                ...state,
                currentCompanyId: (state.companies.length > 0) ? state.companies[0].id : 0
            };

        default:
            return state;
    }
}
