import { FactoryProvider } from '@angular/core';
import { ForwardBearerTokenInterceptor } from '../../interceptors/forward-bearer-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const forwardBearerTokenInterceptorMaker = (regex: RegExp, getToken: () => string | null) => () =>
  new ForwardBearerTokenInterceptor(regex, getToken);

export const forwardBearerTokenFactoryProvider = (
  useFactory: (...provider: never[]) => ForwardBearerTokenInterceptor
): FactoryProvider => ({
  provide: HTTP_INTERCEPTORS,
  useFactory,
  multi: true
});
