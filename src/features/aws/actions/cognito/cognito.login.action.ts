import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { InvalidUsernameOrPasswordError } from '@features/authentication';
import { Cognito } from '../../providers';

const LOGIN_HEADERS: Record<string, string> = {
  'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
  'Content-Type': 'application/x-amz-json-1.1'
};

const loginUrl = (cognito: Cognito): string => `https://cognito-idp.${cognito.region}.amazonaws.com`;

const handleLoginError =
  () =>
  (errorResponse: HttpErrorResponse, caught: Observable<object>): Observable<object> => {
    switch (errorResponse.error.__type) {
      case 'NotAuthorizedException':
        return throwError(() => new InvalidUsernameOrPasswordError());
      default:
        return throwError(() => caught);
    }
  };

export const cognitoLoginAction =
  (http: HttpClient, cognito: Cognito) =>
  (username: string, password: string): Observable<object> =>
    http
      .post(
        loginUrl(cognito),
        {
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password
          },
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: cognito.clientId
        },
        { headers: LOGIN_HEADERS }
      )
      .pipe(catchError(handleLoginError()));
