import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([
        ]),
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production,
        })
    ],
})
export class AppStoreModule { }
