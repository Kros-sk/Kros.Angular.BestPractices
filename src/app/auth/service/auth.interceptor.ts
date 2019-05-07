import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith(`${environment.todoApiUrl}/api`) ||
            (req.url.startsWith(`${environment.usersApiUrl}/api`))) {
            const accessToken = this.authService.getAuthorizationHeaderValue();
            const headers = req.headers.set('Authorization', `${accessToken}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq).do(() => { }, error => {
                const respError = error as HttpErrorResponse;
                if (respError && (respError.status === 401 || respError.status === 403)) {

                }
            });
        } else {
            return next.handle(req);
        }
    }
}
