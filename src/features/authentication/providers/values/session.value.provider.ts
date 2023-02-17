import { ValueProvider } from '@angular/core';

export type Session = {
  isLoggedIn: boolean;
};

export const SESSION_PERSISTENCE = 'authentication.session.persistence' as const;

export const sessionValueProvider = (useValue: Session = { isLoggedIn: false }): ValueProvider => ({
  useValue,
  provide: SESSION_PERSISTENCE
});
