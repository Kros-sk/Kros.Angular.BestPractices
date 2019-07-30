import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyReducer } from './state/company.reducer';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-item/company-item.component';
import { AddCompanyItemComponent } from './add-company-item/add-company-item.component';
import { EditCompanyItemComponent } from './edit-company-item/edit-company-item.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyItem } from './models/company.model';
import { CompanyEffects } from './state/company.effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule,
    StoreModule.forFeature(
      'company', companyReducer),
      EffectsModule.forFeature(
        [CompanyEffects]),
      ],
  declarations: [
    CompanyListComponent,
    CompanyItemComponent,
    AddCompanyItemComponent,
    EditCompanyItemComponent
  ],
  entryComponents: [EditCompanyItemComponent],
  exports: [EditCompanyItemComponent]  
})
export class CompanyModule { }
