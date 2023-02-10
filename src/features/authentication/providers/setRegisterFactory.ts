import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';

export type Register = (username: string, password: string) => Observable<void>;

export const REGISTER_REF = 'authentication.register' as const;

export const setRegisterFactory = (useFactory: () => Register, deps: unknown[] = []): FactoryProvider => ({
  provide: REGISTER_REF,
  useFactory,
  deps
});
