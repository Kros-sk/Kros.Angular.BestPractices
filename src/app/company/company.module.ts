import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyReducer } from './state/company.reducer';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-item/company-item.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      'company', companyReducer),
    // EffectsModule.forFeature([
    //   CompanyEffects
    // ]),
  ]
})
export class CompanyModule { }
