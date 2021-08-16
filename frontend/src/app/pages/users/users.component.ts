import { Component, OnInit } from '@angular/core';
import { UserService } from  '../../_services/user.service'
import {NavigationService} from "../../_services/navigation.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUsers = [];
  constructor(private  userService: UserService, private navigateService: NavigationService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      console.log(res);
      this.listUsers = res;
    })
  }

  openChatRoom(userCard) {
    this.userService.openChatByUser(userCard._id).subscribe((res) => {
        this.navigateService.goToChatPage();
    });
  }

  getChatRoom() {
    // this.userService.getUserChatRoom().subscribe((res) => {
    //   console
    // });
  }

}
