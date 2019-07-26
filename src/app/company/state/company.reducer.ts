import { initialState } from './company.state';
import { CompanyActionsTypes } from './company.actions';

export function companyReducer(state = initialState, action: any): any {
    switch (action.type) {
        case CompanyActionsTypes.LoadSuccess:
            return{
                ...state,
                company: action.payload,
                error: null                
            };

        case CompanyActionsTypes.LoadFail:
            return{
                ...state,
                company: [],
                error: action.payload                
            };
        
        /*case CompanyActionsTypes.AddSuccess:
            return{
                ...state,
                company: action.payload,
                error: null                
            };*/
        
        case CompanyActionsTypes.LoadFail:
            return{
                ...state,
                error: action.payload                
            };

        default:
            return state;
    }
}
