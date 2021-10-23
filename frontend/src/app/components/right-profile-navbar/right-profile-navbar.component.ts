import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SocialService} from "../../_services/social.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-right-profile-navbar',
  templateUrl: './right-profile-navbar.component.html',
  styleUrls: ['./right-profile-navbar.component.scss']
})
export class RightProfileNavbarComponent implements OnInit, OnChanges{
  @Input() profile;
  private userId: string;
  isSubscribedUser: boolean = false;

  constructor(private socialService: SocialService, private userService: UserService) {
  }

  ngOnChanges() {
    console.log(this.profile);
  }
  ngOnInit(): void {
  this.userService.profileIsSubscribed();

  // debugger;
    // setTimeout(() => {
    //   this.socialService.follow(this.profile._id).subscribe((res) => {
    //     console.log(res);
    //   })
    // }, 2000)
  }

  public follow(): void {
    this.userId = this.profile._id;
    // debugger;
    if (this.isSubscribedUser) {
      this.unfollow()
      return;
    }
    this.socialService.follow(this.userId).subscribe((res) => {
      this.isSubscribedUser = true;
      console.log('follow', res);
    })

  }

  public unfollow() {
    this.isSubscribedUser = true;
    this.socialService.unFollow(this.userId).subscribe((res) => {
      this.isSubscribedUser = false;
      console.log('unfolow', res);
    })
  }
}
