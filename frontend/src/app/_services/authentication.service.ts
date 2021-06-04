import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_interfaces/user';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private static readonly httpActions = {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
  };
  public currentUser: Observable<User>;
  // private baseUrl = 'http://45.128.204.29/api';
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(controls) {
    debugger;
    const loginData = {
      username: controls.controls?.username.value,
      password: controls.controls?.password.value,
    };
    if (!loginData) {
      return;
    }
    return this.http
      .post<any>(
        `${this.baseUrl}/${AuthenticationService.httpActions.login}`,
        loginData
      )
      .pipe(
        map((user) => {
          console.log(user);
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  private logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public registration(controls) {
    if (!controls) {
      return;
    }
    const userData = {
      username: controls?.username.value,
      email: controls?.email.value,
      password: controls?.password.value,
    };

    return this.http.post<any>(
      `${this.baseUrl}/${AuthenticationService.httpActions.register}`,
      userData
    );
  }

  public resetPassword(email: string) {
    // const endpoint = `${this.baseUrl}/login?email=${email}`;
    // return this.http.get(endpoint);
  }
}
