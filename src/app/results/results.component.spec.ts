import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ColorSpinnerComponent } from './color-spinner/color-spinner.component';
import { MaterialModulesModule } from '../material/material.module';
import { SatPopoverModule } from '@ncstate/sat-popover';

describe('ResultsComponent', () => {
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResultsComponent,
                ColorSpinnerComponent
            ],
            imports: [
                MaterialModulesModule,
                SatPopoverModule
            ],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    // TODO: Write test that triggers animation and
    // compares progress bar progress with score from passwordService

    // it('should render "results" title in a h2 tag', () => {
    //     const HTMLElement: HTMLElement = fixture.nativeElement;
    //     console.log(HTMLElement);
    //     // const h2 = HTMLElement.querySelector('h2')
    //     expect(HTMLElement.querySelector('h2').textContent).toContain('Results');
    // });
});
