import { Component, OnInit } from '@angular/core';
import { PasswordService, StrengthResponse } from '../password.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    // fade in/out animation
    trigger('fadeAnimation', [

      // resting state of the element when its visible
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})

export class ResultsComponent implements OnInit {
  // defines the progress bar's color
  color = 'primary';

  result: StrengthResponse;

  constructor(public ps: PasswordService) {

  }

  predictabilityTransformation(value: number) {
    if (value === -1) {
      return -1;
    } else {
      return 100 - value;
    }
  }

  ngOnInit() {
    this.ps.getStrength().subscribe(
      data => {
        if (typeof data !== 'number') {
          this.result = data as StrengthResponse;
        }
      }
    );
  }

  updateColor() {
    if (this.result.strength.score <= 20) {
      // very weak
      return 'progress-darkred';
    } else if (this.result.strength.score <= 40) {
      // weak
      return 'progress-red';
    } else if (this.result.strength.score <= 60) {
      // medium
      return 'progress-yellow';
    } else if (this.result.strength.score <= 80) {
      // strong
      return 'progress-green';
    } else {
      // very strong
      return 'progress-darkgreen';
    }
  }
}
