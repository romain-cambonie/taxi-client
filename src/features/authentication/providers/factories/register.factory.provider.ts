import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';

export type RegisterAction = (username: string, password: string) => Observable<void>;

export const REGISTER_ACTION = 'authentication.register.action' as const;

export const registerFactoryProvider = <TDependencies, TProviders>(
  useFactory: (...providers: TProviders[]) => RegisterAction,
  deps: TDependencies[] = []
): FactoryProvider => ({
  provide: REGISTER_ACTION,
  useFactory,
  deps
});
