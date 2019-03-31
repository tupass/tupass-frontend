import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswordService, ErrorType, StrengthResponse } from '../password.service';
import { locale } from 'src/language/locale';

const language: string = locale;

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  animations: [
    // fade in/out animation
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(750)
      ])
    ])
  ]
})

export class PasswordInputComponent implements OnInit {
  constructor(private ps: PasswordService) { }

  // used to check if previous input is the same,
  // therefore making an additional request to the backend superfluous.
  private previousPassword: string;

  // maximal accepted input length
  private maxLength = 100;

  // if the help hint is enabled
  private helpEnabled = false;

  // timer for getPasswordScoreWithDelay()
  private delayTimer: any;

  private lastError: ErrorType = ErrorType.NoError;

  private result: StrengthResponse;


  passwordControl = new FormControl('', [
    // invalidate input field when non-ascii is entered
    Validators.pattern('[\x00-\x7F]*'),
    // invalidate if too long
    Validators.maxLength(this.maxLength)
  ]);

  getLanguage(): string {
    return language;
  }

  /*
  * determines if the input is in a sendable state (extends the validator)
  */
  isNotSendable() {
    return (this.passwordControl.invalid || this.passwordControl.value === null || this.passwordControl.value.length <= 0);
  }

  /*
  * main frontend endpoint that talks to passwordService
  */
  getPasswordScore() {
    // dont do anything if form validation did not pass or the input is empty
    if (this.isNotSendable()) {
      return;
    }

    const password = this.passwordControl.value;

    // if data is same as last time and no error or an invalid input occured, then don't send a new request
    if (password === this.previousPassword && this.lastError < ErrorType.Timeout) {
      return;
    }

    this.previousPassword = password;

    this.ps.putPassword(password);
  }

  // function to trigger submit after some delay without any input
  // gets called on every change in input field to (re)set timer for submitting
  getPasswordScoreWithDelay(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getPasswordScore();
    } else {
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.getPasswordScore();
      }, 400);
    }
  }

  /*
  * returns all non ascii chars
  */
  getFaultyCharacters(): string {
    return this.passwordControl.value.replace(/[\x00-\x7F]/g, '');
  }

  /*
  * changes the view of the entry
  */
  toggleView() {
    const x = <HTMLInputElement>document.getElementById('pwInput');
    if (x.type === 'password') {
      x.type = 'text';
      return true;
    } else {
      x.type = 'password';
      return false;
    }
  }

  getLastError() {
    return this.lastError;
  }

  ngOnInit() {
    this.passwordControl.markAsTouched();

    this.ps.getStrength().subscribe(
      data => {
        if (typeof data === 'number') {
          this.lastError = data as ErrorType;
        } else {
          this.result = data as StrengthResponse;
          this.lastError = ErrorType.NoError;
        }
      }
    );
  }


}
