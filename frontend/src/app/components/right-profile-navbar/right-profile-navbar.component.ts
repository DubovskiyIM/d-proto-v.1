import {Component, Input, OnInit} from '@angular/core';
import {SocialService} from "../../_services/social.service";

@Component({
  selector: 'app-right-profile-navbar',
  templateUrl: './right-profile-navbar.component.html',
  styleUrls: ['./right-profile-navbar.component.scss']
})
export class RightProfileNavbarComponent implements OnInit {
  @Input() profile;

  constructor(private socialService: SocialService) {
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.socialService.follow(this.profile._id).subscribe((res) => {
    //     console.log(res);
    //   })
    // }, 2000)
  }

  public follow(): void {
    let userId = this.profile._id;
    // console.log(userId);
    debugger;

  }

}
