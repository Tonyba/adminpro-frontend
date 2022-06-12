import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { GetUser } from '../interfaces/get-users.interface';

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
  user = {} as User;
  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.user.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role!;
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/user/register`, formData).pipe(
      map((resp: any) => {
        //localStorage.setItem('id', resp.user.uid);
        this.saveLocalStorage(resp.token, resp.menu);
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
          this.router.navigateByUrl('/dashboard');
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
        //localStorage.setItem('id', resp.user.uid);
        this.saveLocalStorage(resp.token, resp.menu);
        //localStorage.setItem('user', JSON.stringify(resp.user));
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp.token, resp.menu);
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
    );
  }

  validateToken() {
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, uid, img = '' } = resp.user;
          this.user = new User(name, email, '', img, role, google, uid);
          this.saveLocalStorage(resp.token, resp.menu);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role || '',
    };

    return this.http.put(`${baseUrl}/user/${this.uid}`, data, this.headers);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
    google.accounts.id.disableAutoSelect();
  }

  getUsers(from: number = 0) {
    return this.http.get<GetUser>(`${baseUrl}/user?from=${from}`, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map((user) => new User(user.name, user.email, '', user.img, user.role, user.google, user.uid));
        return {
          total: resp.total,
          users,
        };
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${baseUrl}/user/${id}`, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(`${baseUrl}/user/${user.uid}`, user, this.headers);
  }
}
