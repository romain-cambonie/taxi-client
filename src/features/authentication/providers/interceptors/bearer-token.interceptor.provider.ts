import { FactoryProvider } from '@angular/core';
import { BearerTokenInterceptor } from '../../interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const bearerTokenInterceptorProvider = (
  useFactory: (...provider: never[]) => BearerTokenInterceptor
): FactoryProvider => ({
  provide: HTTP_INTERCEPTORS,
  useFactory,
  multi: true
});
