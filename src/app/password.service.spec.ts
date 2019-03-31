import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { PasswordService, StrengthResponse, ErrorType } from './password.service';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

let httpMock: HttpTestingController;
let service: PasswordService;

const testUrl = environment.apiUrl + PasswordService.endpoint;

describe('PasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PasswordService]
    });
    service = TestBed.get(PasswordService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // verify that there are no pending requests
    httpMock.verify();
  });

  it('should send a request to the backend', () => {
    // With this password
    const password = 'password';
    // there should be this result (using a simple strength score calculation)
    const expectedResult = {
      length: { score: -1, message: '' },
      complexity: { score: -1, message: '' },
      predictability: { score: -1, message: '' },
      strength: { score: -1, message: '' }
    };

    // subscribe to response
    service.getStrength().subscribe(
      response => {
        if (typeof response !== 'number') {
          // expect score and message field to have the right values
          expect(response.strength.score).toEqual(expectedResult['strength']['score']);
          expect(response.strength.message).toEqual(expectedResult['strength']['message']);
        }
      }
    );

    // send request
    service.putPassword(password);

    // one request is expected
    const req = httpMock.expectOne(testUrl);
    // request uses GET
    expect(req.request.method).toEqual('GET');

    // send back mock data
    req.flush(expectedResult);
  });

  it('can test for network error', () => {
    const password = 'password';
    const emsg = 'simulated network error';
    service.getStrength().subscribe(
      data => {
        if (typeof data !== 'number') {
          fail('should have failed with the network error');
        }
        expect(data).toEqual(ErrorType.Error);
      }
    );
    service.putPassword(password);

    const req = httpMock.expectOne(testUrl);

    // create mock ErrorEvent, raised when something goes wrong at the network level
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    req.error(mockError);
  });
});
