import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { Globals } from '../../globals';
import { HttpService } from '../services/http-service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem('test-data'));
    if (user !== null) {
      return true;
    } else {
      return this.httpService.getRequest(Globals.urls.currentUser).pipe(
        map((user) => {
          if (user && user['response'] === 200 && user['data']) {
            localStorage.setItem('test-data', JSON.stringify(user['data']));
            return true;
          } else {
            this._router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          console.log(1);
          this._router.navigate(['/login']);
          return of(false);
        })
      );
    }
  }
}
