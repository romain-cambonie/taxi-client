import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenSession } from '../providers';

const requestWithBearerToken = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> =>
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

export class BearerTokenInterceptor implements HttpInterceptor {
  public constructor(private authorizedRoutePattern: RegExp, private tokenSession: TokenSession) {}

  private shouldForwardBearerToken = (request: HttpRequest<unknown>, token: string | null): token is string =>
    isValidToken(token) && authorizedRouteMatchPattern(this.authorizedRoutePattern)(request.url);

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.tokenSession.getAccess();
    return next.handle(this.shouldForwardBearerToken(request, token) ? requestWithBearerToken(request, token) : request);
  }
}
