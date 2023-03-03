import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { InvalidUsernameOrPasswordError, Session } from '@features/authentication';
import { Cognito } from '../providers';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  CognitoAuthentication,
  EXPIRES_IN_STORAGE_KEY,
  ID_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from '@features/aws/cognito/authentication/cognito-authentication';

type LoginResponse = { AuthenticationResult: CognitoAuthentication };

const LOGIN_HEADERS: Record<string, string> = {
  'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
  'Content-Type': 'application/x-amz-json-1.1'
};

const loginUrl = (cognito: Cognito): string => `https://cognito-idp.${cognito.region}.amazonaws.com`;

const handleLoginError$ =
  () =>
  (errorResponse: HttpErrorResponse, caught: Observable<LoginResponse>): Observable<LoginResponse> => {
    switch (errorResponse.error.__type) {
      case 'NotAuthorizedException':
        return throwError(() => new InvalidUsernameOrPasswordError());
      default:
        return throwError(() => caught);
    }
  };

const setCognitoAuthenticationToLocalStorage = (loginResponse: LoginResponse): void => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, loginResponse.AuthenticationResult.AccessToken);
  localStorage.setItem(ID_TOKEN_STORAGE_KEY, loginResponse.AuthenticationResult.IdToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, loginResponse.AuthenticationResult.RefreshToken);
  localStorage.setItem(EXPIRES_IN_STORAGE_KEY, loginResponse.AuthenticationResult.ExpiresIn.toString());
};

export const cognitoLoginAction$ =
  (http: HttpClient, cognito: Cognito, session: Session) =>
  (username: string, password: string): Observable<LoginResponse> =>
    http
      .post<LoginResponse>(
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
      .pipe(
        catchError(handleLoginError$()),
        tap(() => (session.isLoggedIn = true)),
        tap((loginResponse: LoginResponse) => setCognitoAuthenticationToLocalStorage(loginResponse))
      );
