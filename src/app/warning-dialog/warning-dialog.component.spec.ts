import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WarningDialogComponent } from './warning-dialog.component';
import { MaterialModulesModule } from '../material/material.module';
import { SatPopoverModule } from '@ncstate/sat-popover';

describe('WarningDialogComponent', () => {
  let component: WarningDialogComponent;
  let fixture: ComponentFixture<WarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarningDialogComponent],
      imports: [MaterialModulesModule, SatPopoverModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
