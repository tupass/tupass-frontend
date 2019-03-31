import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule
} from '@angular/material';
@NgModule({
    exports: [
        FlexLayoutModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTooltipModule,
        MatDividerModule,
        MatPaginatorModule
    ]
})
export class MaterialModulesModule { }
