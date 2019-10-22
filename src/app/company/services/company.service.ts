import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CompanyItem, AddCompanyItem } from '../models/company.model';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    constructor(private http: HttpClient) {}

    public getCompanyList(): Observable<CompanyItem[]> {
        return this.http
            .get<CompanyItem[]>(this.createApiUrl('organizations'))
            .pipe(catchError(handleHttpError));
    }

    public getCompany(id: number): Observable<CompanyItem> {
        return this.http
            .get<CompanyItem[]>(
                this.createApiUrl('organizations', id.toString())
            )
            .pipe(catchError(handleHttpError));
    }

    public addNewCompany(newCompany: AddCompanyItem): Observable<number> {
        return this.http
            .post<{ id: number }>(
                this.createApiUrl('organizations'),
                newCompany
            )
            .pipe(
                map(ret => ret.id),
                catchError(handleHttpError)
            );
    }

    public updateCompany(updatedCompany: CompanyItem): Observable<CompanyItem> {
        return this.http
            .put(
                this.createApiUrl(
                    'organizations',
                    updatedCompany.id.toString()
                ),
                updatedCompany
            )
            .pipe(catchError(handleHttpError));
    }

    public deleteCompany(id: number) {
        return this.http
            .delete(this.createApiUrl('organizations', id.toString()))
            .pipe(catchError(handleHttpError));
    }

    private createApiUrl(
        controllerName: string,
        methodAndParameters?: string
    ): string {
        const apiUrl = `${environment.apiUrl}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
