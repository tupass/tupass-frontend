import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError, Subject } from 'rxjs';
import { timeout, catchError, share } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { locale } from 'src/language/locale';

interface SimpleStrengthResponse {
  score: number;
  message: string;
}

export interface StrengthResponse {
  password: string;
  length: SimpleStrengthResponse;
  complexity: SimpleStrengthResponse;
  predictability: SimpleStrengthResponse;
  strength: SimpleStrengthResponse;
}

export enum ErrorType {
  NoError = 0,
  InvalidInput = 1,
  Timeout = 2,
  Error = 3,
}

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'password': '',
    'language': locale
  })
};


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  // relative endpoint
  public static endpoint = '/api';

  private result: Subject<StrengthResponse|ErrorType> = new Subject();

  public waiting = false;

  // lastError encodes the last occurred error
  private lastError = ErrorType.NoError;

  constructor(
    private http: HttpClient
  ) { }

  private errorToErrorCode(err: Error) {
    if (err instanceof TimeoutError) {
      return ErrorType.Timeout;
    } else if (err instanceof HttpErrorResponse) {
      if (err.status === 400) {
        return ErrorType.InvalidInput;
      }
      return ErrorType.Error;
    }
    return ErrorType.NoError;
  }

  private logError(err: Error) {
    if (err instanceof TimeoutError) {
      this.lastError = ErrorType.Timeout;
      console.error('Timeout has occurred.');
    } else if (err instanceof HttpErrorResponse) {
      this.lastError = ErrorType.Error;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else if (err.url === null && err.status === 0) {
        console.error('Probably a CORS error');
      } else if (err.status === 400) {
        console.error('Error 400 Bad Request');
        this.lastError = ErrorType.InvalidInput;
      } else {
        // The backend returned an unsuccessful response code.
        console.error(err.name, 'occurred: ', err.message);
      }
    } else {
      console.error(err.name, 'occurred: ', err.message);
    }
  }

  private getStrengthResponse(password: string) {
    this.waiting = true;

    httpOptions.headers = httpOptions.headers.set('password', JSON.stringify(password));
    const response = this.http.get<StrengthResponse>(environment.apiUrl + PasswordService.endpoint, httpOptions);

    response.pipe(timeout(10000)).subscribe(
      data => {
        this.waiting = false;
        this.result.next(data);
      },
      error => {
        this.waiting = false;
        this.logError(error);
        this.result.next(this.errorToErrorCode(error));
      }
    );
  }

  public putPassword(password: string) {
    this.getStrengthResponse(password);
  }

  public getStrength(): Observable<StrengthResponse|ErrorType> {
    return this.result.pipe(
      share()
    );
  }
}
