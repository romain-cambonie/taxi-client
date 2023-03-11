import {
  bearerTokenInterceptorProvider,
  logoutFactoryProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider,
  refreshTokenFactoryProvider,
  SESSION_PERSISTENCE,
  sessionValueProvider,
  BearerTokenInterceptor
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
  ['login', '/'],
  ['logout', '/'],
  ['session-expired', '/login']
]);

const AUTHORIZED_ROUTES_PATTERN: RegExp = /\/api/;
const getBearerToken = () => cognitoTokenSession().getAccess();

export const APPLICATION_PROVIDERS = [
  cognitoValueProvider({ clientId: '6dnu0mkd0k5v4pdg9f36vnv0q6', region: 'us-east-1' }),
  sessionValueProvider(cognitoTokenSession()),
  redirectRoutesValueProvider(redirectToRoutes),
  logoutFactoryProvider(cognitoLogoutAction, [SESSION_PERSISTENCE]),
  refreshTokenFactoryProvider(cognitoRefreshTokenAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE]),
  bearerTokenInterceptorProvider(() => new BearerTokenInterceptor(AUTHORIZED_ROUTES_PATTERN, getBearerToken))
];
