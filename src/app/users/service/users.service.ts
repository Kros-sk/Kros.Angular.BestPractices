import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { handleHttpError } from 'src/app/shared/helpers/api.helper';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    public getAllUsers(): Observable<User[]> {
        return this.http
            .get<User[]>(this.createApiUrl('users', 'getAllUsers'))
            .pipe(
                catchError(handleHttpError)
            );
    }

    public updateUser(updateUser: User): Observable<any> {
        return this.http.put(this.createApiUrl('users', updateUser.id.toString()), updateUser)
        .pipe(
            catchError(handleHttpError)
        );
    }

    private createApiUrl(controllerName: string, methodAndParameters?: string): string {
        const apiUrl = `${environment.usersApiUrl}/api/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
