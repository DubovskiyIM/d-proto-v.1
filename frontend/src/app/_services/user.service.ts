import {APP_BASE_HREF} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {ChatService} from "./chat.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root',
})

export class UserService {


  private static readonly httpActions = {
    getAll: 'users',
    rooms: 'rooms',
    getRooms: '',
  };


  constructor(private http: HttpClient,
              @Inject(APP_BASE_HREF) private baseUrl: string,
              private chatService: ChatService,
              private authenticationService: AuthenticationService) {
    this.baseUrl = 'api' + this.baseUrl;
    // console.log(this.baseUrl);
  }

  getUsers() {
    // console.log(`${this.baseUrl}${UserService.httpActions.getAll}`);
    return this.http.get<any>(`${this.baseUrl}${UserService.httpActions.getAll}`);
  }

  openChatByUser(selectUserId) {
    this.chatService.selectedChatUserId = selectUserId;
    return this.http.get(`${this.baseUrl}${UserService.httpActions.rooms}/${selectUserId}`);
  }

  getUserChatRoom() {
    // return this.http.post(`${this.baseUrl}${UserService.httpActions.rooms}`, {_id: selectUserId})
  }

  getUserInfoById(id: string) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  profileIsSubscribed() {

    // debugger;
  }

  setAvatarImage(file) {
    // console.log(this.authenticationService.currentUserValue);
    // debugger;
    const userID: string = this.authenticationService.currentUserValue._id;
    let formData: FormData = new FormData();
    formData.append('file', file);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers: headers,
    }
    return this.http.post(`api/auth/avatar`, formData, options)

  }
}
