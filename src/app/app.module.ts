import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/auth.service';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/app.effects';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forRoot({login: loginReducer}),
        EffectsModule.forRoot([
            AppEffects
        ]),
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production,
        })
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
