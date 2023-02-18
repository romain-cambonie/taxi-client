import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';

export type ForgotPasswordAction = (username: string) => Observable<void>;

export const FORGOT_PASSWORD_ACTION = 'authentication.forgot-password.action' as const;

export const forgotPasswordFactoryProvider = <TDependencies, TProviders>(
  useFactory: (...providers: TProviders[]) => ForgotPasswordAction,
  deps: TDependencies[] = []
): FactoryProvider => ({
  provide: FORGOT_PASSWORD_ACTION,
  useFactory,
  deps
});
