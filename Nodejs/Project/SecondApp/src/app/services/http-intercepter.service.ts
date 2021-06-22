import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let storedData = JSON.parse(localStorage.getItem('Token'));
    if (storedData) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + storedData,
        },
      });
    }

    const credentialsReq = req.clone({ withCredentials: true });
    return next.handle(credentialsReq);
  }
}
