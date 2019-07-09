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
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (!req.url.startsWith(`${environment.apiUrl}`)) {
            return next.handle(req);
        }
        const accessToken = this.authService.getAuthorizationHeaderValue();
        const headers = req.headers.set('Authorization', `${accessToken}`);
        const authReq = req.clone({ headers });

        return next.handle(authReq).pipe(
            tap(() => { }, error => {
                const respError = error as HttpErrorResponse;
                if (respError && (respError.status === 401 || respError.status === 403)) {
                    // @TODO: Add handling of unauthenticated request errors
                }
            })
        );
    }
}
