import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiceWorkerModule } from '@angular/service-worker';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppEffects } from './state/login.effects';
import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './service/auth.interceptor';
import { environment } from 'src/environments/environment';
import { loginReducer } from './state/login.reducer';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forFeature(
            'login', loginReducer),
        EffectsModule.forFeature([
            AppEffects
        ]),
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production,
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
        },
        AuthService
    ]
})
export class AuthModule { }
