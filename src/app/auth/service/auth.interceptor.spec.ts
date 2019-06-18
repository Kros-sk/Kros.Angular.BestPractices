import { HTTP_INTERCEPTORS, HttpResponse, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('Interceptor', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                }),
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                //AuthService,
                AuthInterceptor
            ]
        });
    });

    it('should set header authorization', async(() => {
        const token = 't';
        const service = TestBed.get(AuthService);
        spyOn(service, 'getAuthorizationHeaderValue').and.returnValue('t');
        let response: HttpResponse<any>;
        const next: any = {
            handle: responseHandle => {
                response = responseHandle;
                return of(null);
            }
        };
        const request: HttpRequest<any> = new HttpRequest<any>('GET', `${environment.apiUrl}`);
        const interceptor = TestBed.get(AuthInterceptor);
        interceptor.intercept(request, next);
        expect(response.headers.get('Authorization')).toEqual(token);
    }));
});
