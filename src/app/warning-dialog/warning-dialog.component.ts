import {Component} from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent {
  public bundling = false;
  constructor() {
    this.bundling = environment.bundling;
  }
}



