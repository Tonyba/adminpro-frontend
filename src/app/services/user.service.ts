import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  googleInstance: any;

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/user/register`, formData).pipe(
      map((resp: any) => {
        console.log(resp);
        //localStorage.setItem('id', resp.user.uid);
        localStorage.setItem('token', resp.token);
        //localStorage.setItem('user', JSON.stringify(resp.user));
      })
    );
  }

  async googleInit() {
    return new Promise((resolve: any) => {
      this.googleInstance = google.accounts.id.initialize({
        client_id: '21129360132-tdhfp8h27q2uab279kd1cu3q21f79jld.apps.googleusercontent.com',
        callback: (resp: any) => this.handleCredentialResponse(resp),
      });

      resolve();
    });
  }

  handleCredentialResponse(response: any) {
    this.loginGoogle(response.credential).subscribe(
      (resp) => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  login(formData: LoginForm, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${baseUrl}/login`, formData).pipe(
      map((resp: any) => {
        console.log(resp);
        //localStorage.setItem('id', resp.user.uid);
        localStorage.setItem('token', resp.token);
        //localStorage.setItem('user', JSON.stringify(resp.user));
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.disableAutoSelect();
    this.router.navigateByUrl('/login');
  }
}
