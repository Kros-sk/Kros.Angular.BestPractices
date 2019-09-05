import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getCurrentCompany } from 'src/app/company/state/company.selectors';
import { map, tap } from 'rxjs/internal/operators';
import { CompanyItem } from 'src/app/company/models/company.model';

@Injectable({
    providedIn: 'root'
})
export class LoggedInCompanyGuardServiceService {

    constructor(
        private authService: AuthService,
        private store: Store<any>) { }

    canActivate(): Observable<boolean> {
        if (this.authService.isLoggedIn()) {
            return this.store.pipe(select(getCurrentCompany)).pipe(
                map((currentCompany: CompanyItem) => currentCompany != null)
            );
        } else {
            this.authService.startAuthentication();
            return of(false);
        }
    }
}
