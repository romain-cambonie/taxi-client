import {
  bearerTokenInterceptorProvider,
  logoutActionProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider,
  refreshTokenActionProvider,
  SESSION_PERSISTENCE,
  sessionValueProvider
} from '@features/authentication';
import { HttpClient } from '@angular/common/http';
import {
  COGNITO_PERSISTENCE,
  cognitoLogoutAction,
  cognitoRefreshTokenAction$,
  cognitoTokenSession,
  cognitoValueProvider
} from '@features/aws';

const redirectToRoutes: Map<RedirectRoutesKeys, string> = new Map<RedirectRoutesKeys, string>([
  ['activate', '/login'],
  ['register', '/activate'],
  ['not-activated', '/activate'],
  ['login', '/'],
  ['logout', '/'],
  ['session-expired', '/login'],
  ['forgot-password', '/reset-password'],
  ['reset-password', '/login']
]);

const AUTHORIZED_ROUTES_PATTERN: RegExp = /\/api/;

export const APPLICATION_PROVIDERS = [
  cognitoValueProvider({ clientId: '6dnu0mkd0k5v4pdg9f36vnv0q6', region: 'us-east-1' }),
  sessionValueProvider(cognitoTokenSession()),
  redirectRoutesValueProvider(redirectToRoutes),
  logoutActionProvider(cognitoLogoutAction, [SESSION_PERSISTENCE]),
  refreshTokenActionProvider(cognitoRefreshTokenAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE]),
  bearerTokenInterceptorProvider(AUTHORIZED_ROUTES_PATTERN, cognitoTokenSession())
];
