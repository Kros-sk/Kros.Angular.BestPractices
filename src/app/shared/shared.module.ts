import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
    ],
    declarations: [
      // shared components
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
    ]
})
export class SharedModule {}
