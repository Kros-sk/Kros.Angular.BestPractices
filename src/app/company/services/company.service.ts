import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/auth/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyItem, AddCompanyItem } from '../models/company.model';
import { catchError, tap } from 'rxjs/operators';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService{

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ){}

    public getCompanyList(): Observable<CompanyItem[]> {
        return this.http
        .get<CompanyItem[]>(this.createApiUrl('organizations'))
        .pipe(tap(a => console.log(a)),catchError(handleHttpError)
        );
    }

    public getCompany(id: number): Observable<CompanyItem> {
        return this.http
        .get<CompanyItem[]>(this.createApiUrl('organizations',id.toString()))
        .pipe(catchError(handleHttpError)
        );
    }

    public addNewCompany(newCompany: AddCompanyItem): Observable<any>{
        return this.http
        .post(this.createApiUrl('organizations'), newCompany)
        .pipe(
            catchError(handleHttpError)
        );
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.apiUrl}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}