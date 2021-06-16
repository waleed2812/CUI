import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  globals = Globals;
  httpSub$: Subscription = null;
  model: any = {};

  isLoadingResults: boolean = false;
  hide = true;
  userData: any = {};

  constructor(private service: HttpService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const params = {
      email: this.model.email,
      password: this.model.password,
    };
    this.isLoadingResults = true;
    this.httpSub$ = this.service
      .auth(this.globals.urls.login, params)
      .pipe(map((res) => res))
      .subscribe(
        (res) => {
          this.isLoadingResults = false;
          if (res['data'].success === 1) {
            this.userData = res['data'].data;
            localStorage.setItem(
              'test-data',
              JSON.stringify(this.userData.user)
            );
            localStorage.setItem('Token', JSON.stringify(this.userData.token));
            this.service.showSuccess('Login successful', 'Log In');
            this.router.navigate(['/dashboard']);
          } else {
            this.isLoadingResults = false;
            this.service.showError(res['data'].message, 'Login');
          }
        },
        (err) => {
          console.log(err);
          this.isLoadingResults = false;
          this.service.showError(err.error.message);
        }
      );
  }
}
