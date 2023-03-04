import { HttpClient } from '@angular/common/http';
import {
  ACCOUNTS_PERSISTENCE,
  accountsValueProvider,
  activateFactoryProvider,
  forgotPasswordFactoryProvider,
  inMemoryForgotPasswordAction$,
  loginFactoryProvider,
  registerFactoryProvider,
  SESSION_PERSISTENCE
} from '@features/authentication';
import { COGNITO_PERSISTENCE, cognitoActivateAction$, cognitoLoginAction$, cognitoRegisterAction$ } from '@features/aws';

export const AUTHENTICATION_PROVIDERS = [
  accountsValueProvider(),
  forgotPasswordFactoryProvider(inMemoryForgotPasswordAction$, [ACCOUNTS_PERSISTENCE]),
  activateFactoryProvider(cognitoActivateAction$, [HttpClient, COGNITO_PERSISTENCE]),
  loginFactoryProvider(cognitoLoginAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE]),
  registerFactoryProvider(cognitoRegisterAction$, [HttpClient, COGNITO_PERSISTENCE])
];
