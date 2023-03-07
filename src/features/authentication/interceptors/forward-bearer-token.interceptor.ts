import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ForwardBearerTokenInterceptor implements HttpInterceptor {
  constructor(private matchUrl: RegExp, @Inject('getToken') private getToken: () => string | null) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.getToken();

    if (shouldForwardBearerToken(this.matchUrl)(token, request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}

export const shouldForwardBearerToken =
  (regex: RegExp) =>
  (token: string | null, url: string): boolean =>
    !!token && !!url.match(regex);
