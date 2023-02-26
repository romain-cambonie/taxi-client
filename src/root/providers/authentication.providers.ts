import { HttpClient } from '@angular/common/http';
import {
  ACCOUNTS_PERSISTENCE,
  accountsValueProvider,
  activateFactoryProvider,
  forgotPasswordFactoryProvider,
  inMemoryForgotPasswordAction,
  loginFactoryProvider,
  registerFactoryProvider
} from '@features/authentication';
import {
  COGNITO_PERSISTENCE,
  cognitoActivateAction,
  cognitoLoginAction,
  cognitoRegisterAction,
  cognitoValueProvider
} from '@features/aws';

export const AUTHENTICATION_PROVIDERS = [
  accountsValueProvider(),
  forgotPasswordFactoryProvider(inMemoryForgotPasswordAction, [ACCOUNTS_PERSISTENCE]),
  cognitoValueProvider({ clientId: '2meamgceq5phrr2ntviadvad12', region: 'eu-west-1' }),
  activateFactoryProvider(cognitoActivateAction, [HttpClient, COGNITO_PERSISTENCE]),
  loginFactoryProvider(cognitoLoginAction, [HttpClient, COGNITO_PERSISTENCE]),
  registerFactoryProvider(cognitoRegisterAction, [HttpClient, COGNITO_PERSISTENCE])
];
