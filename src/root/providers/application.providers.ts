import {
  logoutFactoryProvider,
  RedirectRoutesKeys,
  redirectRoutesValueProvider,
  SESSION_PERSISTENCE,
  sessionValueProvider
} from '@features/authentication';
import { cognitoLogoutAction, isCognitoAuthenticationActive } from '@features/aws';

const redirectToRoutes: Map<RedirectRoutesKeys, string> = new Map<RedirectRoutesKeys, string>([
  ['activate', '/login'],
  ['register', '/activate'],
  ['login', '/'],
  ['logout', '/']
]);

export const APPLICATION_PROVIDERS = [
  sessionValueProvider(isCognitoAuthenticationActive()),
  redirectRoutesValueProvider(redirectToRoutes),
  logoutFactoryProvider(cognitoLogoutAction, [SESSION_PERSISTENCE])
];
