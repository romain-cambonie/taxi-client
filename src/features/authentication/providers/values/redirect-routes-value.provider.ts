import { ValueProvider } from '@angular/core';

export type RedirectRoutesKeys = 'register' | 'login' | 'logout' | 'activate';

export type RedirectRoutes = Map<RedirectRoutesKeys, string>;

export const REDIRECT_ROUTES_PERSISTENCE = 'authentication.redirect-routes.persistence' as const;

export const redirectRoutesValueProvider = (useValue: RedirectRoutes): ValueProvider => ({
  useValue,
  provide: REDIRECT_ROUTES_PERSISTENCE
});
