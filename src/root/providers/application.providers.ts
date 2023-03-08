import {
  forwardBearerTokenFactoryProvider,
  logoutFactoryProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider,
  refreshTokenFactoryProvider,
  SESSION_PERSISTENCE,
  sessionValueProvider,
  forwardBearerTokenInterceptorMaker
} from '@features/authentication';
import { HttpClient } from '@angular/common/http';
import {
  COGNITO_PERSISTENCE,
  cognitoLogoutAction,
  cognitoRefreshTokenAction$,
  cognitoTokenSession,
  cognitoValueProvider
} from '@features/aws';
import {} from '../../features/authentication/interceptors/forward-bearer-token.interceptor';

const redirectToRoutes: Map<RedirectRoutesKeys, string> = new Map<RedirectRoutesKeys, string>([
  ['activate', '/login'],
  ['register', '/activate'],
  ['login', '/'],
  ['logout', '/'],
  ['session-expired', '/login']
]);

export const APPLICATION_PROVIDERS = [
  cognitoValueProvider({ clientId: '6dnu0mkd0k5v4pdg9f36vnv0q6', region: 'us-east-1' }),
  sessionValueProvider(cognitoTokenSession()),
  redirectRoutesValueProvider(redirectToRoutes),
  logoutFactoryProvider(cognitoLogoutAction, [SESSION_PERSISTENCE]),
  refreshTokenFactoryProvider(cognitoRefreshTokenAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE]),
  forwardBearerTokenFactoryProvider(
    forwardBearerTokenInterceptorMaker(/\/api/, () => localStorage.getItem('aws.cognito.access-token'))
  )
];
