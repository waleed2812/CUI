import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http-service';
@Injectable({
  providedIn: 'root'
})
export class RouteResolverService {

  constructor(private httpService: HttpService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    var url = route.data['apiUrl'];
    const methodType = route.data['methodType'];
    const paramsAvailable = route.data['paramsAvailable'] ? route.data['paramsAvailable'] : false
    const params = route.params.id;

    if (methodType === 'GET') {
      if (paramsAvailable)
        url = url + '/' + params
      return this.httpService.getRequest(url, {}, false);
    } else if (methodType === 'POST') {
      return this.httpService.postRequest(url, {}, false);
    } else if (methodType === 'PUT') {
      return this.httpService.putRequest(url, {}, false);
    } else if (methodType === 'DELETE') {
      return this.httpService.deleteRequest(url, {}, false);
    }
  }
}
