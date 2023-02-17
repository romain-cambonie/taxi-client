import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';

export type LoginAction = (username: string, password: string) => Observable<void>;

export const LOGIN_ACTION = 'authentication.login.action' as const;

export const loginFactoryProvider = <TDependencies>(
  useFactory: (...providers: never) => LoginAction,
  deps: TDependencies[] = []
): FactoryProvider => ({
  provide: LOGIN_ACTION,
  useFactory,
  deps
});
