import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // private baseUrl = 'http://45.128.204.29/api';
  baseUrl = '';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const endpoint = `${this.baseUrl}/login`;
    return this.http.post<any>(endpoint, { login: username, password }).pipe(
      map((user) => {
        if (user && user.jwt) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }),
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  resetPassword(email: string) {
    // const endpoint = `${this.baseUrl}/login?email=${email}`;
    // return this.http.get(endpoint);
  }

  changePassword(oldPassword: string, newPassword: string, matchingPassword: string) {
    const endpoint = `${this.baseUrl}/changePassword`;
    const body = {
      matching_password: matchingPassword,
      new_password: newPassword,
      old_password: oldPassword,
    };
    return this.http.post(endpoint, body);
  }

}
