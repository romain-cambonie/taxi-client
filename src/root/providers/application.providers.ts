import {
  logoutFactoryProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider,
  refreshTokenFactoryProvider,
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
  ['login', '/'],
  ['logout', '/'],
  ['session-expired', '/login']
]);

export const APPLICATION_PROVIDERS = [
  cognitoValueProvider({ clientId: '2meamgceq5phrr2ntviadvad12', region: 'eu-west-1' }),
  sessionValueProvider(cognitoTokenSession()),
  redirectRoutesValueProvider(redirectToRoutes),
  logoutFactoryProvider(cognitoLogoutAction, [SESSION_PERSISTENCE]),
  refreshTokenFactoryProvider(cognitoRefreshTokenAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE])
];
