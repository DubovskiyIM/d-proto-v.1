import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../_interfaces/user';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static readonly httpActions = {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
  };
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseUrl: string,
    private navigationService: NavigationService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = 'api' + this.baseUrl;
    //
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(controls) {
    if (!controls) {
      return;
    }

    // this.http.get('/api/auth/google').subscribe((res)=> {
    //   console.log(res);
    // })
    //
    // return;
    const loginData = {
      email: controls.controls?.username.value,
      password: controls.controls?.password.value,
    };

    return this.http
      .post<any>(
        `${this.baseUrl}${AuthenticationService.httpActions.login}`,
        loginData
      )
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            // this.userService.setNewUser(user);
          }
          return user;
        })
      );
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.http.post(`${this.baseUrl}${AuthenticationService.httpActions.logout}`, {}).subscribe(()=> {});
    this.currentUserSubject.next(null);
    this.navigationService.exit();
  }

  public registration(controls): Observable<any> {
    if (!controls) {
      return;
    }
    const userData = {
      username: controls?.username.value,
      email: controls?.email.value,
      password: controls?.password.value,
      name: controls?.name.value,
      phone: controls.phone.value,
    };

    return this.http.post<any>(
      `${this.baseUrl}${AuthenticationService.httpActions.register}`,
      userData
    );
  }

  public resetPassword(email: string) {
  }
}
