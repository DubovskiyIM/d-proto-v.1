import { Component, OnInit } from '@angular/core';
import { UserService } from  '../../_services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUsers = [];
  constructor(private  userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      console.log(res);
      this.listUsers = res;
    })
  }

  openChatRoom(userCard) {
    this.userService.openChatByUser(userCard._id).subscribe((res) => {

    });
  }

  getChatRoom() {
    // this.userService.getUserChatRoom().subscribe((res) => {
    //   console
    // });
  }

}
