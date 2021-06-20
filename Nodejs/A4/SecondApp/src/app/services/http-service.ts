import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  observer: Observer<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  postFormRequest(url: string, data: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post(url, data, options).pipe(
      map((res) => {
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (res['response'] === 200 || res['response'] === 304) {
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else {
          throw new Error(res['message']);
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }

  putFormRequest(url: string, data: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.put(url, data, options).pipe(
      map((res) => {
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (
          res['response'] === 200 ||
          (res['response'] === 304 && res['success'] === 1)
        ) {
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else {
          throw new Error(res['message']);
        }
      }),
      catchError(this.handleError)
    );
  }

  // handles all GET Requests, sends the whole response/error to component
  getRequest(url, params = {}, showerror = true) {
    url = url.replace(
      '/en',
      '/' + JSON.parse(localStorage.getItem('app-language'))
    );
    return this.http.get(url, { params: params, observe: 'response' }).pipe(
      map((res) => {
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (
          res['status'] === 200 ||
          res['response'] === 200 ||
          res['response'] === 304
        ) {
          if (res.body['response'] === 401) {
            this.handleUnauthenticated();
          } else {
            return {
              data: res.body['data'],
              response: res.body['response'],
              success: res.body['success'],
              message: res.body['message'],
            };
          }
        } else if (showerror) {
          throw new Error(res.body['message']);
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }

  // handles all POST Requests. Headers are optional, sends the whole response/error to component
  postRequest(url, params, headers = {}) {
    url = url.replace(
      '/en',
      '/' + JSON.parse(localStorage.getItem('app-language'))
    );
    let httpOptions = this.checkHeaders(headers);

    return this.http.post(url, params, { headers: httpOptions }).pipe(
      map((res) => {
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (res['response'] === 200 || res['response'] === 304) {
          return {
            data: res,
            response: res['response'],
            success: res['status'],
          };
        } else if (res['data'].code === '012') {
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else {
          throw new Error(res['message']);
        }
      }),
      // catchError((error: HttpErrorResponse) => {
      //   return this.handleError(error);
      // })
      catchError((err) => this.handleError(err))
    );
  }

  // handles all POST Requests. Headers are optional, sends the whole response/error to component
  putRequest(url, params, headers = {}) {
    let httpOptions = this.checkHeaders(headers);
    url = url.replace(
      '/en',
      '/' + JSON.parse(localStorage.getItem('app-language'))
    );
    return this.http.put(url, params, { headers: httpOptions }).pipe(
      map((res) => {
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (res['response'] === 200 || res['response'] === 304) {
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else if (res['response'] === '1001') {
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else {
          throw new Error(res['message']);
        }
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  deleteRequest(url: string, params: any = {}, headers = {}) {
    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.delete(url, options).pipe(
      map((res) => {
        console.log(res);
        if (res['response'] === 401) {
          this.handleUnauthenticated();
        } else if (res['response'] === 200 ||res['success'] === 1) {
          
          return {
            data: res['data'],
            response: res['response'],
            success: res['success'],
            message: res['message'],
          };
        } else {
          throw new Error(res['message']);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error && error.status === 401) {
        this.router.navigateByUrl('/login');
      } else {
        if (error.error && error.error.message)
          this.showError(error.error.message);
        else this.showError(error);
      }

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      return throwError(error);
    }
    // return an observable with a user-facing error message
    if (error.error) return throwError(error.error.message);
    else return throwError(error);
  }

  // append headers in http requests
  private checkHeaders(headers) {
    if (Object.keys(headers).length) {
      return headers;
    } else
      return {
        'Content-Type': 'application/json',
      };
  }

  handleUnauthenticated(msg: string = '') {
    if (msg) {
      this.showError(msg);
    }
    localStorage.removeItem('token');
    return this.router.navigateByUrl('/login');
  }

  uploadImage(url, fileToUpload: File) {
    var fd = new FormData();
    fd.append('image', fileToUpload);
    return this.http.post(url, fd).pipe(
      map((res) => {
        if (res['response'] === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }

        return {
          data: res['data'],
          message: res['message'],
        };
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  showSuccess = (msg, title) => {
    this.toastr.success(msg, title, {
      closeButton: true,
      timeOut: 3000,
    });
  };

  showError = (msg, title = '') => {
    if (msg) {
      this.toastr.error(msg, title, {
        closeButton: true,
        timeOut: 3000,
      });
    }
  };

  showPasswordMsg = (msg, title, time) => {
    this.toastr.success(msg, title, {
      closeButton: true,
      timeOut: time,
    });
  };

  createObservable(): Observable<any> {
    return new Observable<any>((observer) => {
      this.observer = observer;
    });
  }

  auth(url, params) {
    return this.http
      .post<any>(url, params, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response',
      })
      .pipe(
        map((user) => {
          const res = user['body'];
          if (user['status'] === 401) {
            this.handleUnauthenticated();
          } else if (user['status'] === 200 || user['status'] === 304) {
            return {
              data: res,
              success: res['status'],
            };
          } else {
            throw new Error(res['message']);
          }
        }),
        catchError((err) => this.handleError(err))
      );
  }
}
