import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { AuthService } from './auth.service';
import { getCurrentCompany } from 'src/app/company/state/company.selectors';
import { CompanyItem } from 'src/app/company/models/company.model';

@Injectable({
    providedIn: 'root'
})
export class LoggedInCompanyGuardService {
    constructor(private authService: AuthService, private store: Store<any>) {}

    canActivate(): Observable<boolean> {
        if (this.authService.isLoggedIn()) {
            return this.store
                .pipe(select(getCurrentCompany))
                .pipe(
                    map((currentCompany: CompanyItem) => currentCompany != null)
                );
        } else {
            this.authService.startAuthentication();
            return of(false);
        }
    }
}
