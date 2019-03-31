import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { ResultsComponent } from './results/results.component';
import { AboutComponent } from './about/about.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorSpinnerComponent } from './results/color-spinner/color-spinner.component';
import { MaterialModulesModule } from './material/material.module';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FooterComponent } from './about/footer/footer.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                PasswordInputComponent,
                ResultsComponent,
                AboutComponent,
                FooterComponent,
                ColorSpinnerComponent,
                WarningDialogComponent
            ],
            imports: [
                MaterialModulesModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                NgxPageScrollModule,
                NgxPageScrollCoreModule.forRoot(),
                SatPopoverModule
            ],
            providers: [
                HttpClient,
                HttpHandler
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'TUPass'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('TUPass');
    });
});
