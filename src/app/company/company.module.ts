import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyReducer } from './state/company.reducer';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-item/company-item.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyEffects } from './state/company.effects';
import { SharedModule } from '../shared/shared.module';
import { CompanyShellComponent } from './company-shell/company-shell.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { CompanyAddressComponent } from './company-address/company-address.component';
import { CompanyIdentificationComponent } from './company-identification/company-identification.component';
import { CompanyBankAccountComponent } from './company-bank-account/company-bank-account.component';

@NgModule({
    imports: [
        SharedModule,
        CompanyRoutingModule,
        StoreModule.forFeature('company', companyReducer),
        EffectsModule.forFeature([CompanyEffects])
    ],
    declarations: [
        CompanyListComponent,
        CompanyItemComponent,
        CompanyDetailComponent,
        CompanyShellComponent,
        CompanySettingsComponent,
        CompanyAddressComponent,
        CompanyIdentificationComponent,
        CompanyBankAccountComponent
    ],
    entryComponents: [CompanyDetailComponent],
    exports: [CompanyDetailComponent]
})
export class CompanyModule {}
