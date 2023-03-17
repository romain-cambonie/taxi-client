import { HttpClient } from '@angular/common/http';
import {
  ACCOUNTS_PERSISTENCE,
  accountsValueProvider,
  activateActionProvider,
  forgotPasswordActionProvider,
  inMemoryForgotPasswordAction$,
  loginActionProvider,
  registerActionProvider,
  resendActivationCodeActionProvider,
  SESSION_PERSISTENCE
} from '@features/authentication';
import {
  COGNITO_PERSISTENCE,
  cognitoActivateAction$,
  cognitoLoginAction$,
  cognitoRegisterAction$,
  cognitoResendActivationCodeAction$
} from '@features/aws';

export const AUTHENTICATION_PROVIDERS = [
  accountsValueProvider(),
  forgotPasswordActionProvider(inMemoryForgotPasswordAction$, [ACCOUNTS_PERSISTENCE]),
  activateActionProvider(cognitoActivateAction$, [HttpClient, COGNITO_PERSISTENCE]),
  loginActionProvider(cognitoLoginAction$, [HttpClient, COGNITO_PERSISTENCE, SESSION_PERSISTENCE]),
  registerActionProvider(cognitoRegisterAction$, [HttpClient, COGNITO_PERSISTENCE]),
  resendActivationCodeActionProvider(cognitoResendActivationCodeAction$, [HttpClient, COGNITO_PERSISTENCE])
];
