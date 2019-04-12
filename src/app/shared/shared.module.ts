import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
      // shared components
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ]
})
export class SharedModule {}
