import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModulesModule } from '../material/material.module';
import { PasswordService } from '../password.service';
import { PasswordInputComponent } from './password-input.component';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { SatPopoverModule } from '@ncstate/sat-popover';

describe('PasswordInputComponent', () => {
    let component: PasswordInputComponent;
    let fixture: ComponentFixture<PasswordInputComponent>;
    let passwordService: PasswordService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordInputComponent, WarningDialogComponent],
            imports: [
                MaterialModulesModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                SatPopoverModule
            ],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        passwordService = TestBed.get(PasswordService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should invoke passwordService for a score when there is a password', () => {
        spyOn(passwordService, 'putPassword');
        component.passwordControl.setValue('longerthannothing');
        component.getPasswordScore();
        expect(passwordService.putPassword).toHaveBeenCalled();
    });

    it('should not invoke passwordService when password has a length of zero', () => {
        spyOn(passwordService, 'putPassword');
        component.passwordControl.setValue('');
        component.getPasswordScore();
        expect(passwordService.putPassword).not.toHaveBeenCalled();
    });

    it('should render "Insert your Password" as instruction on the input box', () => {
        const elem: HTMLElement = fixture.nativeElement;
        expect(elem.textContent).toContain('Enter a password to evaluate');
    });
});
