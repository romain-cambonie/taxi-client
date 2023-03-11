import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private authorizedRoutePattern: RegExp, @Inject('getBearerToken') private getBearerToken: () => string | null) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.getBearerToken();

    if (isValidToken(token) && authorizedRouteMatchPattern(this.authorizedRoutePattern)(request.url))
      request = requestWithBearerToken(request, token);

    return next.handle(request);
  }
}

const requestWithBearerToken = (request: HttpRequest<unknown>, token: string) =>
  request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

export const authorizedRouteMatchPattern =
  (pattern: RegExp) =>
  (route: string): boolean =>
    !!route.match(pattern);

export const isValidToken = (token: string | null): token is string => !!token;
