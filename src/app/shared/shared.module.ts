import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class SharedModule { }
