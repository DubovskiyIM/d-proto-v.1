import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLogged: true;

  public user: User;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((res) => {
      if (res?.username) {
        this.isLogged = true;
        this.user = res;
      }
    });
  }

  public logout() {
    this.auth.logout();
  }
}
