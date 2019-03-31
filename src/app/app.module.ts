import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { MaterialModulesModule } from './material/material.module';
import { PasswordInputComponent } from './password-input/password-input.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { ColorSpinnerComponent } from './results/color-spinner/color-spinner.component';
import { ResultsComponent } from './results/results.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FooterComponent } from './about/footer/footer.component';
import { MatPaginatorIntl } from '@angular/material';
import { getGermanPaginatorIntl } from './german-paginator-intl';
import { locale } from 'src/language/locale';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    PasswordInputComponent,
    ResultsComponent,
    AboutComponent,
    ColorSpinnerComponent,
    WarningDialogComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModulesModule,
    NgxPageScrollCoreModule.forRoot(),
    NgxPageScrollModule,
    SatPopoverModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: String(locale) === 'en' ? new MatPaginatorIntl : getGermanPaginatorIntl() }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
