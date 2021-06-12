import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PreloadingStrategy, Route } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class PreloadSelectedModulesList implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preload ? load() : of(null);
    }
}