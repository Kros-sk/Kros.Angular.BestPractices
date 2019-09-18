import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CompanyListComponent } from './company-list/company-list.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { CompanyShellComponent } from './company-shell/company-shell.component';

const routes: Routes = [
    {
        path: '',
        component: CompanyShellComponent,
        children: [
            {
                path: 'list',
                component: CompanyListComponent
            },
            {
                path: 'settings/:id',
                component: CompanySettingsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {}
