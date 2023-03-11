import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValueProvider } from '@angular/core';
import { BearerTokenInterceptor } from '../../interceptors';
import { TokenSession } from '../values';

export const bearerTokenInterceptorProvider = (authorizedRoutePattern: RegExp, tokenSession: TokenSession): ValueProvider => ({
  provide: HTTP_INTERCEPTORS,
  useValue: new BearerTokenInterceptor(authorizedRoutePattern, tokenSession),
  multi: true
});
