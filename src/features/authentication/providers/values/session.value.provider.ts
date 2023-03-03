import { ValueProvider } from '@angular/core';

export type Session = {
  isLoggedIn: boolean;
};

export const SESSION_PERSISTENCE = 'authentication.session.persistence' as const;

export const sessionValueProvider = (isLoggedIn: boolean): ValueProvider => ({
  useValue: { isLoggedIn },
  provide: SESSION_PERSISTENCE
});
