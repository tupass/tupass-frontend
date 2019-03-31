import { Component, HostListener, OnInit } from '@angular/core';
import { PasswordService, StrengthResponse } from './password.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { locale } from 'src/language/locale';

const slogansEN = {
  empty: 'How strong is your password? Check it yourself...',
  very_bad: 'This is not even a password. Go ahead and improve it.',
  bad: 'This counts as a password but we wouldn\'t suggest to use it.',
  okay: 'This password is ok to use, if your account isn\'t too important.',
  good: 'This is quite a good password but there\'s still space for improvements.',
  very_good: 'This is an excellent password. Congratulations!'
};

const slogansDE = {
  empty: 'Wie stark ist dein Passwort? Prüfe es selbst...',
  very_bad: 'Das ist kein Passwort. Verbessere es.',
  bad: 'Das zählt als Passwort, aber wir raten es nicht zu nutzen.',
  okay: 'Dieses Passwort kannst du nutzen, falls das Konto nicht sehr wichtig ist.',
  good: 'Das ist schon ein gutes Passwort, aber es gibt noch Spielraum für Verbesserungen.',
  very_good: 'Das ist ein sehr gutes Passwort. Glückwunsch!'
};

const language: string = locale;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // fade in/out animation
    trigger('fadeAnimation', [

      // resting state of the element when its visible
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ]),
  ]

})
export class AppComponent implements OnInit {
  private slogans;
  private oldSlogan;

  title = 'TUPass';

  belowAboutPage = false;

  private result: StrengthResponse;

  constructor(public ps: PasswordService) {
    this.setSlogans();
    this.oldSlogan = this.slogans.empty;
  }

  @HostListener('window:scroll', ['$event'])
  spyScrollPosition(event) {
    if (window.pageYOffset >= 500) {
      this.belowAboutPage = true;
    } else {
      this.belowAboutPage = false;
    }
  }

  funEasing(t: number, b: number, c: number, d: number): number {
    // easeInOutExpo easing
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  ngOnInit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    this.ps.getStrength().subscribe(
      data => {
        if (typeof data !== 'number') {
          this.result = data as StrengthResponse;
        }
      }
    );
  }

  setSlogans() {
    if (this.getLanguage() === 'en') {
      this.slogans = slogansEN;
    } else {
      this.slogans = slogansDE;
    }
  }

  getLanguage(): string {
    return language;
  }

  update() {
    const currentSlogan = this.updateSlogan();
    if (currentSlogan !== this.oldSlogan) {
      const element = document.getElementById('test');
      this.oldSlogan = currentSlogan;
      element.classList.remove('blink');
      setTimeout( () => { element.classList.add('blink'); }, 15);
    }
    return currentSlogan;
  }

  updateSlogan() {
    let returnedSlogan: string;

    if (this.result == null) {
      // empty
      returnedSlogan = this.slogans.empty;
    } else if (this.result.strength.score <= 20) {
      // very weak
      returnedSlogan = this.slogans.very_bad;
    } else if (this.result.strength.score <= 40) {
      // weak
      returnedSlogan = this.slogans.bad;
    } else if (this.result.strength.score <= 60) {
      // medium
      returnedSlogan = this.slogans.okay;
    } else if (this.result.strength.score <= 80) {
      // strong
      returnedSlogan = this.slogans.good;
    } else {
      // very strong
      returnedSlogan = this.slogans.very_good;
    }
    return returnedSlogan;
  }
}
