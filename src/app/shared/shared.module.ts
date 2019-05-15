import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NgbModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        NgbModule,
    ]
})
export class SharedModule { }
