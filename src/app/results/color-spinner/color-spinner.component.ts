import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color-spinner',
  templateUrl: './color-spinner.component.html',
  styleUrls: ['./color-spinner.component.scss']
})
export class ColorSpinnerComponent implements OnInit {

  @Input() value: number;
  @Input() metric: string;

  constructor() { }

  ngOnInit() {
  }

  updateColorLength() {
    if (this.value < 19.2307692) {
      // very short (shorter than 5 out of 26 chars)
      return 'spinner-darkred';
    } else if (this.value < 42.23076923) {
      // short (shorter than 11 out of 26 chars)
      return 'spinner-red';
    } else if (this.value < 65.3846154) {
      // medium (shorter than 17 out of 26 chars)
      return 'spinner-yellow';
    }  else if (this.value < 88.4615385) {
      // long (shorter than 23 out of 26 chars)
      return 'spinner-green';
    } else {
      // very long
      return 'spinner-darkgreen';
    }
  }

  updateColorComplexity() {
    if (this.value < 13.1462334) {
      // very simple (complexity < 89 out of 677)
      return 'spinner-darkred';
    } else if (this.value < 37.9615953) {
      // simple (complexity < 257 out of 677)
      return 'spinner-red';
    } else if (this.value < 62.7769572) {
      // medium (complexity < 425 out of 677)
      return 'spinner-yellow';
    } else if (this.value < 87.5923191) {
      // complex (complexity < 593 out of 677)
      return 'spinner-green';
    } else {
      // very complex (complexity > 677)
      return 'spinner-darkgreen';
    }
  }

  updateColorPredictability() {
    if (this.value < 40) {
      return 'spinner-darkred';
    } else if (this.value < 60) {
      return 'spinner-yellow';
    } else {
      return 'spinner-darkgreen';
    }
  }

  updateColor() {
    if (this.metric === 'length') {
      return this.updateColorLength();
    } else if (this.metric === 'complexity') {
      return this.updateColorComplexity();
    } else if (this.metric === 'predictability') {
      return this.updateColorPredictability();
    }
  }
}
