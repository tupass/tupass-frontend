import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSpinnerComponent } from './color-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';

describe('ColorSpinnerComponent', () => {
  let component: ColorSpinnerComponent;
  let fixture: ComponentFixture<ColorSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSpinnerComponent ],
      imports: [
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
